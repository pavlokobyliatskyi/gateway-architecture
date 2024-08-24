export interface SuccessResponse<T = unknown> {
  status: 'success';
  data: T;
  time: Date;
}
