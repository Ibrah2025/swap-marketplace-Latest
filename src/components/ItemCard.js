export class ItemCard {
  constructor(item) {
    this.item = item;
  }
  
  render() {
    return `
      <div class="item-card">
        <img src="${this.item.image}" alt="${this.item.title}">
        <h3>${this.item.title}</h3>
        <p>${this.item.condition}</p>
        <p>${this.item.location}</p>
      </div>
    `;
  }
}
