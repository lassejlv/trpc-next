


export interface Action<T> {
  success: boolean;
  message?: string;
  data: T | null;
}