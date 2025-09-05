import firebaseService from "../services/firebase.service.mock.js"; // Using mock for now
import store from "../store/store.js";

export class AuthComponent {
  constructor() {
    this.isLoginMode = true;
  }

  render() {
    return `
      <div style="max-width: 400px; margin: 50px auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2>${this.isLoginMode ? "Anmelden" : "Registrieren"}</h2>
        <p style="background: #fff3cd; padding: 10px; border-radius: 4px; margin-bottom: 20px; font-size: 14px;">
           Development Mode - Any email/password will work
        </p>
        <form id="authForm" style="margin-top: 20px;">
          ${!this.isLoginMode ? `
            <input type="text" id="name" placeholder="Name" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
          ` : ""}
          <input type="email" id="email" placeholder="Email" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
          <input type="password" id="password" placeholder="Passwort" required style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;">
          <button type="submit" style="width: 100%; padding: 10px; background: #007185; color: white; border: none; border-radius: 4px; cursor: pointer;">
            ${this.isLoginMode ? "Anmelden" : "Registrieren"}
          </button>
        </form>
        <p style="margin-top: 15px; text-align: center;">
          ${this.isLoginMode ? "Noch kein Konto?" : "Bereits registriert?"}
          <a href="#" id="toggleAuth" style="color: #007185; text-decoration: none;">
            ${this.isLoginMode ? "Registrieren" : "Anmelden"}
          </a>
        </p>
      </div>
    `;
  }

  attachEvents() {
    const form = document.getElementById("authForm");
    const toggle = document.getElementById("toggleAuth");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
      try {
        if (this.isLoginMode) {
          await firebaseService.login(email, password);
        } else {
          const name = document.getElementById("name").value;
          await firebaseService.register(email, password, name);
        }
      } catch (error) {
        alert(error.message);
      }
    });

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      this.isLoginMode = !this.isLoginMode;
      document.getElementById("app").innerHTML = this.render();
      this.attachEvents();
    });
  }
}
