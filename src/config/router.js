export const router = {
  init() {
    console.log('Router initialized');
    this.loadPage('home');
  },
  
  loadPage(pageName) {
    const app = document.getElementById('app');
    app.innerHTML = \<h2>\ page</h2>\;
  }
};
