import { UserRole } from "../interfaces/interfaces";

export class JWTUser {
  readonly id: string;
  private role: UserRole;

  constructor(details: any) {
    this.id = details.sub;
    this.role = details.role;
  }

  isAdmin(): boolean {
    return this.role.toLowerCase() === UserRole.ADMIN;
  }

  getUsername(): string {
    return this.id;
  }
}
