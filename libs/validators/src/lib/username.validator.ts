export function isUsernameValid(username: string): boolean {
  return /^[A-Za-z]{1,20}( [A-Za-z]{1,20})?$/.test(username);
}
