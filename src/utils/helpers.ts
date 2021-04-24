export function buildResponse(
  status: number,
  success: boolean,
  data: any,
  error: string
) {
  return {
    success,
    data,
    error,
    status,
  };
}
