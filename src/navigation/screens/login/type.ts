export interface ChangePasswordDto {
  email: string;
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
}
