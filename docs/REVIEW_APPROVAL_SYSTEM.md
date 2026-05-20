# Review Approval System Implementation

## Overview

This implementation adds a review approval workflow where reviews created by reviewers are not visible to authors until the Editor-in-Chief approves them. This ensures quality control and allows editors to review feedback before it reaches the manuscript authors.

## Key Features

- ✅ Fetch all reviews including those pending approval
- ✅ Filter reviews by status (e.g., `PENDING_APPROVAL`)
- ✅ Approve reviews to make them visible to authors
- ✅ Pagination support (ready for backend implementation)
- ✅ TypeScript type safety throughout
- ✅ React Query integration for caching and automatic refetching

## Files Modified/Created

### 1. Configuration ([constants/config.ts](constants/config.ts))

Added new endpoints:
- `getAllReviews`: GET `/v1/review/all-review`
- `approveReview`: PATCH `/v1/review/{reviewId}/approve`

```typescript
export const reviewer = {
  // ... existing endpoints
  getAllReviews: `${baseUrl}/v1/review/all-review`,
  approveReview: (reviewId: string) => `${baseUrl}/v1/review/${reviewId}/approve`,
};
```

### 2. TypeScript Types ([types/index.tsx](types/index.tsx))

Added comprehensive type definitions:

```typescript
export type ReviewStatus = 
  | "PENDING_APPROVAL" 
  | "APPROVED" 
  | "REJECTED" 
  | "UNDER_REVIEW" 
  | "COMPLETED";

export type ReviewRecommendation = 
  | "ACCEPT" 
  | "MINOR_REVISIONS" 
  | "MAJOR_REVISIONS" 
  | "REJECT";

export interface Review {
  id: string;
  manuscriptId: string;
  reviewerId: string;
  reviewDate: string;
  status: ReviewStatus;
  comments: string;
  commentsForEditors: string | null;
  checklist: any | null;
  recommendation: ReviewRecommendation;
  isClosed: boolean;
  canAuthorView: boolean;
  aiDeclarationConfirmed: boolean;
  notifyOnFinalStatus: boolean;
  uploadedFileUrl: string | null;
  approvedByUserId: string | null;
  approvedAt: string | null;
  authorId: string;
  createdByUserId: string | null;
  editorId: string | null;
  Manuscript?: ManuscriptProps;
  Reviewer?: ReviewerDetails;
  Author?: AuthorProps;
  Reply: Reply[];
}
```

### 3. API Functions ([app/api/reviewer/index.tsx](app/api/reviewer/index.tsx))

Added four new API functions:

#### `getAllReviews(params?: PaginationParams)`
Fetches all reviews with optional pagination and filtering.

```typescript
interface PaginationParams {
  page?: number;
  limit?: number;
  status?: string;
}

// Usage
const reviews = await getAllReviews({ page: 1, limit: 10, status: "PENDING_APPROVAL" });
```

#### `approveReview(reviewId: string)`
Approves a review and makes it visible to the author.

```typescript
// Usage
const result = await approveReview("review-id-here");
if (result.success) {
  console.log("Review approved!");
}
```

#### `getReviewsByStatus(status: string, params?)`
Helper function to fetch reviews by specific status.

```typescript
// Usage
const pendingReviews = await getReviewsByStatus("PENDING_APPROVAL", { page: 1, limit: 10 });
```

#### `getPendingApprovalReviews(params?)`
Convenience function specifically for pending approval reviews.

```typescript
// Usage
const pendingReviews = await getPendingApprovalReviews({ page: 1, limit: 10 });
```

### 4. Custom Hooks ([app/(dashboard)/hooks/useFetchAllReviews.ts](app/(dashboard)/hooks/useFetchAllReviews.ts))

#### `useFetchAllReviews(params?)`
Primary hook for fetching reviews with React Query integration.

```typescript
const {
  reviews,           // Array of Review objects
  isFetching,        // Loading state
  isError,           // Error state
  error,             // Error object
  availableReviews,  // Boolean: true if reviews exist
  refetch,           // Function to manually refetch
} = useFetchAllReviews({ page: 1, limit: 10, status: "PENDING_APPROVAL" });
```

#### `useFetchPendingApprovalReviews(params?)`
Specialized hook for pending approval reviews.

```typescript
const {
  reviews,           // Array of pending Review objects
  isFetching,        // Loading state
  isError,           // Error state
  error,             // Error object
  availableReviews,  // Boolean: true if reviews exist
  pendingCount,      // Number of pending reviews
  refetch,           // Function to manually refetch
} = useFetchPendingApprovalReviews({ page: 1, limit: 10 });
```

### 5. Example Component ([app/(dashboard)/dashboard/editor-in-chief/reviews/components/PendingReviewsApproval.tsx](app/(dashboard)/dashboard/editor-in-chief/reviews/components/PendingReviewsApproval.tsx))

A complete example component demonstrating the review approval workflow for the Editor-in-Chief.

## Usage Examples

### Example 1: Display All Reviews

```typescript
"use client";

import useFetchAllReviews from "@/app/(dashboard)/hooks/useFetchAllReviews";

export default function AllReviewsPage() {
  const { reviews, isFetching, availableReviews } = useFetchAllReviews({
    page: 1,
    limit: 20,
  });

  if (isFetching) return <div>Loading...</div>;
  if (!availableReviews) return <div>No reviews found</div>;

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h3>{review.Manuscript?.title}</h3>
          <p>Status: {review.status}</p>
          <p>Recommendation: {review.recommendation}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Filter by Status

```typescript
import useFetchAllReviews from "@/app/(dashboard)/hooks/useFetchAllReviews";

export default function PendingReviewsPage() {
  const { reviews, isFetching } = useFetchAllReviews({
    status: "PENDING_APPROVAL",
    page: 1,
    limit: 10,
  });

  // ... render logic
}
```

### Example 3: Approve a Review

```typescript
"use client";

import { approveReview } from "@/app/api/reviewer";
import { useNotification } from "@/hooks/useNotification";

export default function ApproveButton({ reviewId, onSuccess }: Props) {
  const { showNotification } = useNotification();
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const result = await approveReview(reviewId);
      
      if (result.success) {
        showNotification({
          message: "Review approved successfully!",
          mode: "success",
        });
        onSuccess?.();
      } else {
        showNotification({
          message: result.message || "Failed to approve review",
          mode: "error",
        });
      }
    } catch (error) {
      showNotification({
        message: "An error occurred",
        mode: "error",
      });
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <button 
      onClick={handleApprove} 
      disabled={isApproving}
    >
      {isApproving ? "Approving..." : "Approve Review"}
    </button>
  );
}
```

### Example 4: Using Pagination

```typescript
import { useState } from "react";
import useFetchAllReviews from "@/app/(dashboard)/hooks/useFetchAllReviews";

export default function PaginatedReviews() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { reviews, isFetching } = useFetchAllReviews({ page, limit });

  return (
    <div>
      {/* Reviews list */}
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      {/* Pagination controls */}
      <div>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={reviews.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

## API Response Structure

### GET /v1/review/all-review

The endpoint returns an array of review objects:

```json
[
  {
    "id": "3680d812-a8a5-49d7-9c8f-8e5e4125eb98",
    "manuscriptId": "583f158f-12f7-47bf-8edf-157c88b40636",
    "reviewerId": "a9d985d3-1e6a-448b-b178-c53310ae9cce",
    "reviewDate": "2025-08-29T04:16:14.458Z",
    "status": "PENDING_APPROVAL",
    "comments": "The manuscript is well-structured...",
    "commentsForEditors": null,
    "recommendation": "MINOR_REVISIONS",
    "isClosed": true,
    "canAuthorView": false,
    "aiDeclarationConfirmed": false,
    "notifyOnFinalStatus": false,
    "uploadedFileUrl": null,
    "approvedByUserId": null,
    "approvedAt": null,
    "authorId": "d7884595-eae2-49e4-ba59-4f8bd831d423",
    "createdByUserId": "a9d985d3-1e6a-448b-b178-c53310ae9cce",
    "editorId": null,
    "Manuscript": { /* manuscript details */ },
    "Reviewer": { /* reviewer details */ },
    "Author": { /* author details */ },
    "Reply": [ /* array of replies */ ]
  }
]
```

### PATCH /v1/review/{reviewId}/approve

Successful response:
```json
{
  "success": true,
  "message": "Review approved successfully",
  "data": { /* updated review object */ }
}
```

## Review Workflow

1. **Reviewer Creates Review**
   - Reviewer submits feedback for a manuscript
   - Review status is set to `PENDING_APPROVAL`
   - `canAuthorView` is set to `false`
   - Author cannot see the review yet

2. **Editor-in-Chief Reviews**
   - Editor fetches all pending reviews using `getPendingApprovalReviews()`
   - Reviews the feedback and comments
   - Can see `commentsForEditors` (if any)

3. **Editor-in-Chief Approves**
   - Calls `approveReview(reviewId)`
   - Backend updates:
     - Status changes (e.g., to `APPROVED`)
     - `canAuthorView` set to `true`
     - `approvedByUserId` set to editor's ID
     - `approvedAt` timestamp recorded

4. **Author Views Review**
   - Author can now see the approved review
   - Author can respond via the reply system
   - Conversation continues between reviewer and author

## Pagination Support

The implementation includes pagination parameters that are ready for backend implementation:

```typescript
// Current implementation prepares query parameters
const queryParams = new URLSearchParams();
if (params?.page) queryParams.append("page", params.page.toString());
if (params?.limit) queryParams.append("limit", params.limit.toString());
if (params?.status) queryParams.append("status", params.status);
```

When the backend adds pagination support, the following will work automatically:
- `?page=2&limit=10` - Get page 2 with 10 items per page
- `?status=PENDING_APPROVAL&limit=20` - Get 20 pending reviews

## Best Practices

1. **Always refetch after approval**
   ```typescript
   const result = await approveReview(reviewId);
   if (result.success) {
     refetch(); // Update the list
   }
   ```

2. **Handle loading states**
   ```typescript
   if (isFetching) return <LoadingSpinner />;
   ```

3. **Handle empty states**
   ```typescript
   if (!availableReviews) return <EmptyState />;
   ```

4. **Use proper error handling**
   ```typescript
   if (isError) {
     return <ErrorMessage error={error} />;
   }
   ```

5. **Leverage React Query caching**
   - Data is cached for 2 minutes (120 seconds)
   - Automatic background refetching
   - Optimistic UI updates possible

## Integration Checklist

To integrate this into your Editor-in-Chief dashboard:

- [x] Add endpoints to config
- [x] Create TypeScript types
- [x] Implement API functions
- [x] Create custom hooks
- [x] Build example component
- [ ] Add page route in editor-in-chief section
- [ ] Update navigation config to include reviews link
- [ ] Add to Editor-in-Chief dashboard tabs
- [ ] Style components according to design system
- [ ] Add permissions/role checks
- [ ] Test approval workflow end-to-end

## Next Steps

1. **Create Page Route**
   ```typescript
   // app/(dashboard)/dashboard/editor-in-chief/reviews/page.tsx
   import PendingReviewsApproval from "./components/PendingReviewsApproval";
   
   export default function ReviewsPage() {
     return <PendingReviewsApproval />;
   }
   ```

2. **Add to Navigation**
   ```typescript
   // In config-navigation.tsx
   {
     title: "Reviews",
     path: `${basePath.editor_in_chief}/reviews`,
     icon: ICONS.document,
   }
   ```

3. **Add Tab Configuration**
   ```typescript
   export const EditorInChiefReviewsPageTab = [
     { value: "pending", label: "Pending Approval" },
     { value: "approved", label: "Approved" },
     { value: "all", label: "All Reviews" },
   ];
   ```

## Testing

Test the implementation with these scenarios:

1. **Fetch pending reviews**: Verify all PENDING_APPROVAL reviews are returned
2. **Approve review**: Confirm status changes and author can view
3. **Pagination**: Test page navigation (when backend adds support)
4. **Error handling**: Test with invalid review IDs
5. **Loading states**: Verify UI shows loading indicators
6. **Empty states**: Test when no reviews exist

## Troubleshooting

**Issue**: Reviews not loading
- Check bearer token authentication
- Verify API endpoint is correct
- Check network tab for errors

**Issue**: Approval not working
- Verify user has Editor-in-Chief role
- Check review ID is valid
- Confirm backend permissions

**Issue**: Types not working
- Run `npm run type-check`
- Verify imports are correct
- Check tsconfig.json paths

## Support

For questions or issues:
1. Check the API documentation
2. Review the example component
3. Check console for error messages
4. Verify bearer token is valid
