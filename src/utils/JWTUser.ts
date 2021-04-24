import { UserRole } from "../interfaces/interfaces";

export class JWTUser {
  readonly id: string;
  private role: UserRole;
  private email: string;

  constructor(details: any) {
    this.id = details.id;
    this.email = details.email;
    this.role = details.role;
  }

  isAdmin(): boolean {
    return this.role.toLowerCase() === UserRole.ADMIN;
  }

  getUsername(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }
}
