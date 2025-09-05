export class ItemsList {
  constructor(items = []) {
    this.items = items;
  }

  render() {
    if (this.items.length === 0) {
      return `<p style="text-align: center; color: #666;">No items available for swap yet</p>`;
    }

    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
        ${this.items.map(item => this.renderItem(item)).join("")}
      </div>
    `;
  }

  renderItem(item) {
    return `
      <div class="item-card" style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s;">
        <img src="${item.photoURL || "https://via.placeholder.com/250x200"}" 
             alt="${item.title}" 
             style="width: 100%; height: 200px; object-fit: cover;">
        <div style="padding: 15px;">
          <h3 style="margin: 0 0 8px; color: #232f3e;">${item.title}</h3>
          <p style="margin: 0 0 4px; color: #666; font-size: 14px;">Condition: ${item.condition || "Good"}</p>
          <p style="margin: 0 0 8px; color: #007185; font-weight: 500;"> ${item.location || "Berlin"}</p>
          <button style="width: 100%; padding: 8px; background: #ff9900; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Propose Swap
          </button>
        </div>
      </div>
    `;
  }
}