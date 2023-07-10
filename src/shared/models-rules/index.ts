
export function getUserIdFromRequest(request: any): string {
  return request.user && request.user.id;
}
