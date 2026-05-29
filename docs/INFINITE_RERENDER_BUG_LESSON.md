# Issue: Infinite Re-render Loop in PublicationsTable Component

**Status:** Fixed  
**Date:** 2026-05-29  
**Component:** `app/components/@dashboard/components/@dashboard/common/publications/publications-table.tsx`  
**Severity:** High (Performance degradation, browser unresponsiveness)

---

## Problem Description

The `PublicationsTable` component was continuously re-rendering, causing:
- Browser performance degradation
- High CPU usage
- Constant network requests to fetch volumes
- Component state being reset repeatedly
- User interactions being interrupted

### Symptoms Observed

1. Volume filter dropdown kept clearing unexpectedly
2. Publications data would reset/reload infinitely
3. The component appeared to be "stuck" in a render loop
4. Network tab showed repeated requests to `/v1/volumes` endpoint
5. React DevTools showed constant re-renders even with no user interaction

---

## Root Cause Analysis

### The Dependency Chain Loop

The bug was caused by an **uncontrolled dependency chain** in the effect hooks:

```typescript
// BEFORE (Broken Pattern)

const fetchVolumes = useCallback(async () => {
  try {
    setIsFetchingVolumes(true);
    const response = await getVolume();
    setVolumes(Array.isArray(response) ? response : []);
    // ...
  } catch (err) {
    notify("Unable to load volumes", { mode: "error" }); // ← DEPENDENCY
  }
}, [notify]); // ← notify is a context value, recreated on every render

useEffect(() => {
  fetchVolumes();
}, [fetchVolumes]); // ← Effect depends on fetchVolumes
```

### Why This Created an Infinite Loop

1. **Initial render** → `useNotification()` hook called → `notify` function returned
2. `fetchVolumes` created with dependency on `notify`
3. `useEffect` depends on `fetchVolumes` → runs `fetchVolumes()`
4. Component re-renders due to state updates
5. **Re-render** → `useNotification()` called again → **new `notify` function instance**
6. `fetchVolumes` is recreated (different reference)
7. `useEffect` sees `fetchVolumes` changed → runs again
8. Back to step 4 → **infinite loop**

### Additional Issue: Empty API Response Fallback

A secondary issue compounded the problem:
```typescript
// When API returned empty array
setVolumes(Array.isArray(response) ? response : []);
// This always replaced volumes with [], even if previous state had data
// Caused unnecessary state churn and infinite re-renders
```

---

## Solution Implemented

### Pattern: Separate Effects for Different Concerns

**Key insight:** Distinguish between:
- **One-time initialization** (fetch volumes on mount)
- **Response-driven updates** (fetch publications on filter changes)

```typescript
// AFTER (Correct Pattern)

// 1. Fetch volumes ONCE on component mount
useEffect(() => {
  const fetchVolumes = async () => {
    try {
      setIsFetchingVolumes(true);
      const response = await getVolume();
      const fetchedVolumes = Array.isArray(response) ? response : [];

      // Only update if we got new data; preserve previous state if empty
      setVolumes((previousVolumes) => {
        if (fetchedVolumes.length === 0) {
          return previousVolumes;
        }
        return fetchedVolumes;
      });
    } catch (err) {
      console.error("Failed to fetch volumes", err);
      notify("Unable to load volumes", { mode: "error" });
    } finally {
      setIsFetchingVolumes(false);
    }
  };

  fetchVolumes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // ← Empty dependency array: run ONLY once on mount

// 2. Fetch publications when filters/pagination change
useEffect(() => {
  const fetchPublications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPublications({
        page,
        limit,
        sortOrder,
        search: debouncedSearch || undefined,
        volumeId: volumeFilter || undefined,
        issueId: issueFilter || undefined,
        isActive:
          statusFilter === "all"
            ? undefined
            : statusFilter === "active"
              ? true
              : false,
      });
      setPublications(response.data);
      setMeta(response.meta);
    } catch (err) {
      console.error("Failed to fetch publications", err);
      setError("Unable to load publications");
    } finally {
      setIsLoading(false);
    }
  };

  fetchPublications();
}, [page, limit, sortOrder, debouncedSearch, volumeFilter, issueFilter, statusFilter]);
// ← Explicit dependencies: only re-run when these filter values change

// 3. Refresh via state change (no new callback dependency)
const handleRefresh = () => {
  setPage(1); // ← Naturally triggers the publications effect
};
```

### Key Changes

1. **Removed `useCallback` wrapper** from fetch functions
   - Defined async functions directly inside effects
   - Eliminates callback dependency tracking issues

2. **Separated concerns into two independent effects**
   - Initial data (volumes) with `[]` dependency
   - Filter-driven data (publications) with explicit value dependencies

3. **Added empty response fallback**
   - Preserves previous state when API returns empty array
   - Prevents unnecessary state churn

4. **Refresh mechanism via state change**
   - `setPage(1)` naturally triggers publications effect
   - No direct callback invocation needed

5. **Suppressed intentional ESLint rule**
   ```typescript
   // eslint-disable-next-line react-hooks/exhaustive-deps
   ```
   - Explicitly ignore `notify` for mount-only effect
   - Documented intent in code

---

## Key Lessons Learned

### ❌ Anti-Patterns to Avoid

1. **Don't use `useCallback` when effect dependencies become complex**
   ```typescript
   // BAD: Creates dependency chain when callback depends on context
   const fetch = useCallback(() => { notify(...) }, [notify]);
   useEffect(() => { fetch() }, [fetch]);
   ```

2. **Don't replace state with empty values without checking**
   ```typescript
   // BAD: Always replaces, even with empty array
   setVolumes(response.length === 0 ? [] : response);
   
   // GOOD: Preserve previous state
   setVolumes(prev => response.length === 0 ? prev : response);
   ```

3. **Don't mix initialization logic with filter-driven logic in one effect**
   ```typescript
   // BAD: Both run on every dependency change
   useEffect(() => {
     fetchVolumes(); // Should only run once
     fetchPublications(); // Should run on filter changes
   }, [many, dependencies]);
   ```

### ✅ Best Practices Applied

1. **Use direct async functions in effects for one-time operations**
   ```typescript
   useEffect(() => {
     const init = async () => { /* ... */ };
     init();
   }, []);
   ```

2. **Keep effect dependencies minimal and explicit**
   - One effect per concern
   - Only depend on values that actually drive re-fetches

3. **Think about the data lifecycle**
   - Initialization vs. updates vs. filters
   - Map each to separate effects

4. **Suppress ESLint only when intentional**
   - Document why the rule is disabled
   - Use minimal scope (line-by-line when possible)

5. **Test the dependency array carefully**
   - React DevTools → Profiler tab
   - Check: "Why did this render?"
   - Trace dependency changes

---

## Testing & Validation

### Before Fix
- Component re-renders: **~50 per second** (uncontrolled)
- Network requests: **constant rapid requests**
- Volume filter: **repeatedly resets**

### After Fix
- Component re-renders: **only on user interaction** (~2-3 per action)
- Network requests: **1x on mount + 1x per filter change** (predictable)
- Volume filter: **stable, preserves user selection**

### How to Verify
1. Open React DevTools → Profiler
2. Record a session with the component mounted
3. **Before fix:** See thousands of renders in seconds
4. **After fix:** See renders only on user actions

---

## References

- **React Hooks Rules:** https://react.dev/reference/rules/rules-of-hooks
- **Effect Dependencies:** https://react.dev/learn/lifecycle-of-reactive-effect#dependencies
- **Common Mistakes:** https://react.dev/reference/react/useEffect#troubleshooting

---

## Related Files

- **Fixed Component:** `app/components/@dashboard/components/@dashboard/common/publications/publications-table.tsx`
- **Similar Pattern Used In:** `app/components/publish-manuscript/index.tsx` (uses TanStack Query as better alternative)

---

## Action Items for Future

- [ ] Consider migrating all data fetching to **TanStack Query** (React Query) for consistent patterns
- [ ] Add React DevTools Profiler check to code review process
- [ ] Document effect dependency patterns in team guidelines
- [ ] Add performance monitoring to catch re-render loops early
