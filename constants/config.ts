/**
 * Api detail
 */

export const baseUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL  ;

export const authUrl = `${baseUrl}/v1/auth`;

export const api = {
  submitManuscript: `${baseUrl}/v1/manuscripts`,
  publishManuscript: `${baseUrl}/v1/publication/publish`,
  AuthorManuscripts: `${baseUrl}/v1/author/submitted-manuscripts`,
  AllManuscripts: `${baseUrl}/v1/manuscripts/submitted`,
  CEManuscripts: `${baseUrl}/v1/manuscripts`,
  SEManuscript: `${baseUrl}/v1/manuscripts/section-editor`,
  REManuscript: `${baseUrl}/v1/review/assigned-manuscript`,
  getSection: `${baseUrl}/v1/section/all`,
  createSection: `${baseUrl}/v1/section/create`,
  editSection: `${baseUrl}/v1/section`,
  assignManuscriptSection: `${baseUrl}/v1/manuscripts/assign-section`,
  authorMetrics: `${baseUrl}/v1/author/status-counts`,
  reviewerMetrics: `${baseUrl}/v1/analytics/reviewer/manuscripts-count`,
  reviewerDashboardAnalytics: `${baseUrl}/v1/review/dashboard/analytics`,
  globalSearch: `${baseUrl}/v1/publication/global-search`,
  dashboardAnalytics: `${baseUrl}/v1/manuscripts/dashboard/analytics`,
  sectionEditorDashboardAnalytics: `${baseUrl}/v1/manuscripts/dashboard/section-editor/analytics`,
};

export const publication = {
  publishedManuscripts: `${baseUrl}/v1/publication/published-manuscript`,
  update: (id: string) => `${baseUrl}/v1/publication/${id}`,
};

export const SectionEditor = {
  getAllReviewer: `${baseUrl}/v1/manuscripts/reviewers-for-section-editor`,
  assignManuscriptReviewer: `${baseUrl}/v1/manuscripts/assign-reviewers`,
  assignSuggestedReviewer: `${baseUrl}/v1/manuscripts/assign/suggested-reviewer`,
  unassignReviewer: (manuscriptId: string) =>
    `${baseUrl}/v1/manuscripts/${manuscriptId}/unassign-reviewers`,
};

export const reviewer = {
  getRecommendation: `${baseUrl}/v1/review/recommendations`,
  createReview: `${baseUrl}/v1/review/create-review`,
  getRepliesAuthor: `${baseUrl}/v1/reply`,
  getReplies: `${baseUrl}/v1/reply/manuscript`,
  acceptManuscriptUrl: `${baseUrl}/v1/review/review`,
  createReply: `${baseUrl}/v1/reply/reply`,
  createReplyReviewer: `${baseUrl}/v1/reply/reviewer`,
  closeOpenReview: `${baseUrl}/v1/review`,
  getAllReviews: `${baseUrl}/v1/review/all-review`,
  approveReview: (reviewId: string) => `${baseUrl}/v1/review/${reviewId}/approve`,
  getReviewById: (reviewId: string) => `${baseUrl}/v1/review/${reviewId}`,
  getReviewsByManuscriptId: (manuscriptId: string) => `${baseUrl}/v1/review/manuscript/${manuscriptId}`,
  completeReview: (manuscriptId: string) => `${baseUrl}/v1/review/complete/${manuscriptId}`,
};

export const author = {
  createReply: `${baseUrl}/v1/reply/author`,
};

export const User = {
  createUser: `${baseUrl}/v1/user`,
  createAuthor: `${baseUrl}/v1/author/author`,
  paginatedUsers: `${baseUrl}/v1/user/paginated-users`,
  getUser: (id: string) => `${baseUrl}/v1/user/${id}`,
  updateRoleOrSection: (id: string) => `${baseUrl}/v1/user/${id}/role-or-section`,
  updateProfile: (id: string) => `${baseUrl}/v1/user/${id}/profile`,
};

export const Auth = {
  requestResetPassword: `${authUrl}/password/request-reset`,
  validateResetPasswordToken: `${authUrl}/password/validate-token`,
  resetPassword: `${authUrl}/password/reset`,
  changePassword: `${authUrl}/password/change`,
};

export const Role = {
  getAllRoles: `${baseUrl}/v1/roles-permissions/roles`,
};

export const volume = {
  Volume: `${baseUrl}/v1/volumes`,
  Issue: `${baseUrl}/v1/issues`,
};
