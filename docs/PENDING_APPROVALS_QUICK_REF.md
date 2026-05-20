# Pending Approvals Tab - Quick Reference

## 🎯 What's New

A new **"Pending Approvals"** tab has been added to the Editor-in-Chief Submissions page. This tab shows manuscripts that have reviews waiting for approval.

## 📍 Where to Find It

**Dashboard → Submissions → Pending Approvals Tab**

```
Editor-in-Chief Dashboard
  └── Submissions
       ├── All Manuscript (existing)
       └── Pending Approvals (NEW!)
```

## 🚀 Quick Start

### View Pending Approvals
```typescript
// The tab automatically shows:
// - Number of manuscripts with pending reviews
// - Total number of reviews waiting approval
// - Visual cards for each manuscript
```

### What You'll See
- **Summary Banner**: "8 reviews waiting for your approval across 5 manuscripts"
- **Manuscript Cards**: Each showing a badge with pending review count
- **Empty State**: Friendly message when nothing pending

## 📊 Key Features

✅ **At-a-Glance Summary**: See total pending reviews and manuscripts  
✅ **Visual Indicators**: Yellow badges show review count per manuscript  
✅ **Responsive Grid**: Works on desktop, tablet, and mobile  
✅ **Auto-Refresh**: Data updates automatically  
✅ **Empty State**: Clear message when no approvals needed  

## 🔧 Files Created

| File | Purpose |
|------|---------|
| `useFetchManuscriptsWithPendingReviews.ts` | Hook to fetch manuscripts with pending reviews |
| `pending-approvals/index.tsx` | Tab component UI |
| Updated `tabs/index.tsx` | Added new tab to configuration |

## 💡 How It Works

1. **Hook fetches all reviews** with status `PENDING_APPROVAL`
2. **Groups by manuscript** to show unique manuscripts
3. **Counts reviews** per manuscript
4. **Displays in grid** with visual indicators
5. **Auto-refreshes** when you approve a review

## 🎨 UI Elements

### Summary Banner (Yellow)
```
⚠ Action Required                          [8 Pending]
8 reviews waiting for your approval across 5 manuscripts
```

### Manuscript Card
```
┌─────────────────────┐
│      [2 Reviews]     │  ← Badge shows count
│                      │
│  Manuscript Title    │
│  Author Name         │
│  Status, Section...  │
│                      │
└─────────────────────┘
```

## 📝 Usage Flow

```
1. Navigate to Submissions page
   ↓
2. Click "Pending Approvals" tab
   ↓
3. See manuscripts with pending reviews
   ↓
4. Click on a manuscript card
   ↓
5. View and approve individual reviews
   ↓
6. Return to tab (counts update automatically)
```

## 🔍 What Gets Displayed

For each manuscript:
- ✅ Title and abstract
- ✅ Author information
- ✅ Number of pending reviews (badge)
- ✅ Manuscript status
- ✅ Section assignment
- ✅ All standard manuscript details

## ⚙️ Technical Details

### Hook API
```typescript
const {
  manuscripts,          // Array of manuscripts
  pendingReviewsCount, // Total reviews pending
  manuscriptsCount,    // Number of manuscripts
  isFetching,          // Loading state
  refetch,             // Refresh function
} = useFetchManuscriptsWithPendingReviews();
```

### Data Source
- Fetches from: `/v1/review/all-review?status=PENDING_APPROVAL`
- Updates every: 60 seconds (or on manual refetch)
- Cache: React Query managed

## 🎯 Use Cases

### Scenario 1: Daily Review
"As Editor-in-Chief, I want to see all reviews waiting for my approval"
→ Click Pending Approvals tab

### Scenario 2: Quick Count
"How many reviews do I need to approve?"
→ Look at the summary banner

### Scenario 3: Focus on One Manuscript
"I want to approve reviews for a specific manuscript"
→ Click the manuscript card

## 🚨 Important Notes

1. **Grouped by Manuscript**: Multiple reviews per manuscript show as one card
2. **Real-time Updates**: Approving a review automatically updates the list
3. **Empty is Good**: No pending approvals means you're all caught up!

## 🔄 Integration with Existing Features

This tab works seamlessly with:
- ✅ Existing manuscript detail view
- ✅ Review approval system (from previous implementation)
- ✅ Navigation and routing
- ✅ User permissions

## 📱 Responsive Design

| Screen Size | Columns |
|-------------|---------|
| Mobile (xs) | 1 |
| Tablet (sm) | 2 |
| Desktop (md) | 3 |
| Large (lg) | 4 |

## 🐛 Troubleshooting

**Q: Tab not showing?**  
A: Clear cache and reload, ensure you're logged in as Editor-in-Chief

**Q: No manuscripts showing but I know there are reviews?**  
A: Check that reviews have status "PENDING_APPROVAL" and include Manuscript data

**Q: Count seems wrong?**  
A: Remember: One manuscript can have multiple reviews. The badge shows reviews per manuscript.

## 📚 Related Documentation

- **[PENDING_APPROVALS_TAB.md](PENDING_APPROVALS_TAB.md)** - Full implementation guide
- **[REVIEW_APPROVAL_SYSTEM.md](REVIEW_APPROVAL_SYSTEM.md)** - Review approval system
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Review system quick reference

## ✅ Ready to Use!

The feature is fully implemented and tested. Just navigate to:

**Dashboard → Submissions → Pending Approvals**

and start managing pending review approvals!

---

**Need Help?** See the full documentation in `PENDING_APPROVALS_TAB.md`
