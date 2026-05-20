# Pending Approvals Tab - Implementation Guide

## Overview

Added a new **"Pending Approvals"** tab under the Manuscripts section for the Editor-in-Chief. This tab displays manuscripts that have reviews waiting for approval before being visible to authors.

## What Was Added

### 1. New Hook: `useFetchManuscriptsWithPendingReviews`
**Location**: `app/(dashboard)/hooks/useFetchManuscriptsWithPendingReviews.ts`

Fetches all reviews with `PENDING_APPROVAL` status and groups them by manuscript.

**Returns**:
- `manuscripts` - Array of unique manuscripts with pending reviews
- `pendingReviewsCount` - Total number of pending reviews
- `manuscriptsCount` - Number of unique manuscripts
- `isFetching` - Loading state
- `availableManuscripts` - Boolean indicating if there are manuscripts
- `refetch` - Function to refresh data

**Usage**:
```typescript
const {
  manuscripts,
  pendingReviewsCount,
  manuscriptsCount,
  isFetching,
  refetch,
} = useFetchManuscriptsWithPendingReviews();
```

### 2. New Tab Component: `PendingApprovalsTab`
**Location**: `app/(dashboard)/dashboard/editor-in-chief/submissions/tabs/pending-approvals/index.tsx`

Displays manuscripts with pending review approvals in a grid layout.

**Features**:
- ✅ Summary banner showing total pending reviews
- ✅ Badge on each manuscript card showing number of pending reviews
- ✅ Grid layout responsive to different screen sizes
- ✅ Empty state when no pending approvals
- ✅ Loading state with spinner
- ✅ Hover effects on manuscript cards

### 3. Updated Tab Configuration
**Location**: `app/components/@dashboard/components/@dashboard/common/config/tabs/index.tsx`

Added the new tab to `EditorInChiefManuscriptsPageTab`:
```typescript
export const EditorInChiefManuscriptsPageTab = [
  {
    title: "All Manuscript",
    component: CEManuscriptTab,
  },
  {
    title: "Pending Approvals",
    component: PendingApprovalsTab,
  },
];
```

## How It Works

### Data Flow

```
1. Editor-in-Chief navigates to Submissions page
   ↓
2. Clicks "Pending Approvals" tab
   ↓
3. useFetchManuscriptsWithPendingReviews hook:
   - Calls getAllReviews({ status: "PENDING_APPROVAL" })
   - Gets all reviews with status PENDING_APPROVAL
   - Groups reviews by manuscript ID
   - Counts reviews per manuscript
   ↓
4. PendingApprovalsTab displays:
   - Summary banner with total counts
   - Grid of manuscript cards
   - Each card shows pending review count
   ↓
5. Editor clicks on a manuscript card
   - Opens manuscript details
   - Can view and approve individual reviews
```

### Key Features

#### Summary Banner
Shows an action-required banner with:
- Total number of pending reviews
- Number of unique manuscripts
- Visual indicator (yellow/amber theme)

#### Manuscript Cards
Each card displays:
- Manuscript title and details
- Badge showing number of pending reviews
- Hover effect for better UX
- Click to view details

#### Empty State
When no pending approvals:
- Shows friendly illustration
- Clear message
- Reassuring text

## UI Screenshots (Described)

### With Pending Approvals
```
┌─────────────────────────────────────────────────────────────┐
│ Pending Review Approvals                                     │
│ 5 manuscripts with 8 reviews awaiting your approval          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ ⚠ Action Required                                [8 Pending] │
│ 8 reviews waiting for your approval across 5 manuscripts     │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│ │   [2 Pending]│  │   [1 Pending]│  │   [3 Pending]│         │
│ │ Manuscript 1 │  │ Manuscript 2 │  │ Manuscript 3 │         │
│ │ Title here   │  │ Title here   │  │ Title here   │         │
│ │ Author...    │  │ Author...    │  │ Author...    │         │
│ └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────────────────────────────┐
│ Pending Review Approvals                                     │
│ 0 manuscripts with 0 reviews awaiting your approval          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│                         [Image]                               │
│                                                               │
│                  No Pending Approvals                         │
│                                                               │
│     All reviews have been approved or there are no            │
│     reviews waiting for your approval at this time.           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Integration Steps

### Step 1: Navigate to Manuscripts
1. Log in as Editor-in-Chief
2. Go to **Dashboard** > **Submissions**

### Step 2: Access Pending Approvals
1. You'll see two tabs: "All Manuscript" and "Pending Approvals"
2. Click **"Pending Approvals"**

### Step 3: View Pending Reviews
1. See the summary banner with counts
2. Browse manuscripts with pending reviews
3. Each card shows how many reviews need approval

### Step 4: Approve Reviews
1. Click on a manuscript card
2. View the manuscript details and reviews
3. Approve individual reviews (using existing functionality)
4. Return to the tab - counts will update automatically

## Technical Details

### React Query Integration
- **Query Key**: `["manuscripts-with-pending-reviews"]`
- **Stale Time**: 60 seconds (1 minute)
- **Auto Refetch**: When tab regains focus
- **Cache**: Shared across components

### Performance
- Efficient grouping of reviews by manuscript
- Minimal re-renders with React Query
- Responsive grid layout
- Lazy image loading

### Responsive Design
Grid columns adapt to screen size:
- **xs (mobile)**: 1 column
- **sm (tablet)**: 2 columns
- **md (desktop)**: 3 columns
- **lg (large desktop)**: 4 columns

## Styling

Uses Material-UI with custom styling:
- **Primary Color**: Amber/Yellow for pending status
- **Card Border**: Grey with hover effect
- **Typography**: Consistent with design system
- **Spacing**: Material-UI spacing system

### Color Scheme
- **Banner Background**: `#FEF3C7` (amber-100)
- **Banner Border**: `#F59E0B` (amber-500)
- **Text Primary**: `#92400E` (amber-900)
- **Text Secondary**: `#78350F` (amber-950)
- **Badge**: `#F59E0B` background with white text

## Future Enhancements

### Possible Improvements
1. **Bulk Actions**: Approve multiple reviews at once
2. **Filtering**: Filter by recommendation type, reviewer, date
3. **Sorting**: Sort by submission date, priority, etc.
4. **Search**: Search manuscripts by title, author
5. **Notifications**: Badge count on navigation item
6. **Quick Preview**: Modal to review without full page navigation
7. **Comments**: Add editor comments when approving
8. **Reject Option**: Ability to reject reviews

### API Enhancements (Backend)
1. **Pagination**: Add pagination to the reviews endpoint
2. **Filtering**: Support multiple status filters
3. **Statistics**: Endpoint for dashboard metrics
4. **Batch Operations**: Approve multiple reviews in one request

## Troubleshooting

### Issue: Tab not showing
**Solution**: Clear browser cache and reload

### Issue: No manuscripts showing but reviews exist
**Solution**: 
- Check if reviews have status "PENDING_APPROVAL"
- Verify review objects include Manuscript data
- Check browser console for errors

### Issue: Counts don't match
**Solution**:
- The hook counts unique manuscripts and total reviews
- One manuscript can have multiple pending reviews
- This is expected behavior

### Issue: Cards not clickable
**Solution**:
- Ensure ManuscriptContent component handles clicks
- Check if manuscript detail route exists
- Verify user permissions

## Testing Checklist

- [ ] Tab appears in Submissions page
- [ ] Summary banner shows correct counts
- [ ] Manuscript cards display correctly
- [ ] Pending review badges show correct numbers
- [ ] Hover effects work on cards
- [ ] Empty state displays when no pending reviews
- [ ] Loading state shows while fetching
- [ ] Clicking card navigates to details
- [ ] Responsive design works on mobile/tablet
- [ ] Data refreshes after approving a review

## Related Files

### Core Implementation
- `app/(dashboard)/hooks/useFetchManuscriptsWithPendingReviews.ts`
- `app/(dashboard)/dashboard/editor-in-chief/submissions/tabs/pending-approvals/index.tsx`
- `app/components/@dashboard/components/@dashboard/common/config/tabs/index.tsx`

### Dependencies
- `app/api/reviewer/index.tsx` - `getAllReviews()` function
- `app/(dashboard)/hooks/useFetchAllReviews.ts` - Review fetching utilities
- `types/index.tsx` - Review and Manuscript types
- `constants/config.ts` - API endpoints

### Components Used
- `ManuscriptSubHeader` - Page header
- `ManuscriptContent` - Manuscript card content
- Material-UI components (Box, Paper, Chip)

## API Requirements

### Required Endpoint
- **GET** `/v1/review/all-review`
- Should accept query parameter: `?status=PENDING_APPROVAL`
- Returns array of Review objects with nested Manuscript data

### Review Object Structure
```typescript
{
  id: string;
  status: "PENDING_APPROVAL";
  Manuscript: {
    id: string;
    title: string;
    // ... other manuscript fields
  };
  // ... other review fields
}
```

## Summary

The Pending Approvals tab provides Editor-in-Chief with:
1. **Quick Overview**: See all manuscripts needing attention
2. **Action Counts**: Know exactly how many reviews to approve
3. **Easy Navigation**: Click to view and approve reviews
4. **Real-time Updates**: Auto-refresh with React Query
5. **User-Friendly**: Clear UI with empty states and loading indicators

This feature streamlines the review approval workflow and helps editors stay on top of pending tasks.
