export class UserRegisteredEvent {
  constructor(
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  toString() {
    return JSON.stringify({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
    });
  }
}
