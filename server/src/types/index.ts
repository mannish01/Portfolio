export interface IContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

