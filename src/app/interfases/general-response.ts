export interface GeneralResponse <T> {
  data: T;
  success: boolean;
  status: number;
}
