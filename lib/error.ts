export type ActionError = {
  error: string;
  message?: string;
  statusCode?: number;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ServerErrorResponse<T = {}> = ActionError | T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isActionError(error: any): error is ActionError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    !!error.error
  );
}
