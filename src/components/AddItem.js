import firebaseService from "../services/firebase.service.mock.js";
import store from "../store/store.js";

export class AddItemComponent {
  constructor(onClose) {
    this.onClose = onClose;
  }

  render() {
    return `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; border-radius: 8px; padding: 20px; max-width: 500px; width: 90%;">
          <h2>Add New Item</h2>
          <form id="addItemForm">
            <input type="text" id="title" placeholder="Item Title" required style="width: 100%; padding: 8px; margin: 10px 0;">
            <select id="category" required style="width: 100%; padding: 8px; margin: 10px 0;">
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
            </select>
            <select id="condition" required style="width: 100%; padding: 8px; margin: 10px 0;">
              <option value="Like new">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
            <input type="text" id="location" placeholder="Location" style="width: 100%; padding: 8px; margin: 10px 0;">
            <div style="margin-top: 20px;">
              <button type="button" id="cancelBtn" style="padding: 10px 20px; margin-right: 10px;">Cancel</button>
              <button type="submit" style="padding: 10px 20px; background: #007185; color: white; border: none; border-radius: 4px;">Add Item</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const form = document.getElementById("addItemForm");
    const cancelBtn = document.getElementById("cancelBtn");

    cancelBtn.addEventListener("click", () => this.onClose());

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const itemData = {
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        condition: document.getElementById("condition").value,
        location: document.getElementById("location").value || "Berlin"
      };
      
      await firebaseService.addItem(itemData);
      alert("Item added successfully!");
      this.onClose();
      // DO NOT reload - just close the modal
    });
  }
}