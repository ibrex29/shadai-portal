# Review Approval System - Quick Reference

## 🎯 What Was Implemented

A complete review approval workflow where reviews are hidden from authors until the Editor-in-Chief approves them.

## 📁 Files Created/Modified

### Created
1. **[useFetchAllReviews.ts](app/(dashboard)/hooks/useFetchAllReviews.ts)** - Custom hooks for fetching reviews
2. **[PendingReviewsApproval.tsx](app/(dashboard)/dashboard/editor-in-chief/reviews/components/PendingReviewsApproval.tsx)** - Example component
3. **[REVIEW_APPROVAL_SYSTEM.md](docs/REVIEW_APPROVAL_SYSTEM.md)** - Full documentation

### Modified
1. **[constants/config.ts](constants/config.ts)** - Added review endpoints
2. **[types/index.tsx](types/index.tsx)** - Added Review types
3. **[app/api/reviewer/index.tsx](app/api/reviewer/index.tsx)** - Added API functions

## 🚀 Quick Start

### 1. Fetch All Reviews
```typescript
import useFetchAllReviews from "@/app/(dashboard)/hooks/useFetchAllReviews";

const { reviews, isFetching, refetch } = useFetchAllReviews({
  page: 1,
  limit: 10,
  status: "PENDING_APPROVAL" // optional filter
});
```

### 2. Fetch Only Pending Reviews
```typescript
import { useFetchPendingApprovalReviews } from "@/app/(dashboard)/hooks/useFetchAllReviews";

const { reviews, pendingCount, refetch } = useFetchPendingApprovalReviews({
  page: 1,
  limit: 10
});
```

### 3. Approve a Review
```typescript
import { approveReview } from "@/app/api/reviewer";

const result = await approveReview(reviewId);
if (result.success) {
  // Review approved!
  refetch(); // Update the list
}
```

## 🔑 Key Features

✅ **Pagination Ready** - Supports page/limit parameters (backend will add later)  
✅ **Type Safe** - Full TypeScript support  
✅ **React Query** - Automatic caching and refetching  
✅ **Status Filtering** - Filter by PENDING_APPROVAL, APPROVED, etc.  
✅ **Error Handling** - Comprehensive error states  
✅ **Example Component** - Ready-to-use UI component  

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/review/all-review` | Get all reviews |
| PATCH | `/v1/review/{reviewId}/approve` | Approve review |

## 🔄 Workflow

```
Reviewer Creates Review
    ↓
Status: PENDING_APPROVAL
canAuthorView: false
    ↓
Editor-in-Chief Reviews
    ↓
Editor Approves
    ↓
Status: APPROVED (or similar)
canAuthorView: true
    ↓
Author Can Now See Review
```

## 📝 Review Object Structure

```typescript
interface Review {
  id: string;
  status: "PENDING_APPROVAL" | "APPROVED" | ...;
  recommendation: "ACCEPT" | "MINOR_REVISIONS" | ...;
  comments: string;
  canAuthorView: boolean;
  Manuscript?: { title, author, ... };
  Reviewer?: { User: { firstName, lastName, ... } };
  Reply: Reply[];
  // ... more fields
}
```

## 🎨 Example Usage in Component

```typescript
"use client";

import { useFetchPendingApprovalReviews } from "@/app/(dashboard)/hooks/useFetchAllReviews";
import { approveReview } from "@/app/api/reviewer";

export default function ReviewsPage() {
  const { reviews, isFetching, refetch } = useFetchPendingApprovalReviews();

  const handleApprove = async (reviewId: string) => {
    const result = await approveReview(reviewId);
    if (result.success) {
      refetch(); // Update list
    }
  };

  if (isFetching) return <div>Loading...</div>;

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h3>{review.Manuscript?.title}</h3>
          <p>{review.comments}</p>
          <button onClick={() => handleApprove(review.id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 🔧 Next Steps to Integrate

1. **Create page route**: `app/(dashboard)/dashboard/editor-in-chief/reviews/page.tsx`
2. **Add to navigation**: Update `config-navigation.tsx`
3. **Style the component**: Apply your design system
4. **Add permissions**: Verify user role is Editor-in-Chief
5. **Test workflow**: Test approval end-to-end

## 📚 Full Documentation

See [REVIEW_APPROVAL_SYSTEM.md](docs/REVIEW_APPROVAL_SYSTEM.md) for complete documentation with examples, troubleshooting, and best practices.

## ✅ Ready for Backend Pagination

When backend adds pagination, these will work automatically:
- `?page=2&limit=10`
- `?status=PENDING_APPROVAL&page=1&limit=20`

No frontend changes needed!
