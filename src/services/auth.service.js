export class AuthService {
  constructor() {
    this.currentUser = null;
  }
  
  login(email, password) {
    console.log(`Login attempt: ${email}`);
    // Firebase auth will be added here
    return Promise.resolve({ email, id: "user123" });
  }
  
  logout() {
    this.currentUser = null;
    console.log("User logged out");
  }
}

export default new AuthService();
