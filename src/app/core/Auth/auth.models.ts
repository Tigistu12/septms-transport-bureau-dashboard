export type UserRole =
  | 'Passenger'
  | 'Driver'
  | 'BureauAdmin'
  | 'TransportOfficer'
  | 'TariffOfficer'
  | 'TerminalInspector'
  | 'QueueMarshal'
  | 'FinanceAuditor'
  | 'OperatorManager';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  faydaId: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  faydaId: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
}

export interface CurrentUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  faydaId: string;
  role: UserRole;
}