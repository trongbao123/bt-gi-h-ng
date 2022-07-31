export default class SanPham {
  constructor(name, price, manhinh, camera, frontCamera, img, desc, type, id) {
    this.name = name;
    this.price = price;
    this.screen = manhinh;
    this.backCamera = camera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.id = id;

  }
  showSPHTML() {
    return `
        <div class="card" style="display:flex">
        <img src="${this.img}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
          <div class="card-title">${this.name}</div>
          <div class="card-text">${this.desc}$</div>
          <div class="card-text">${Number(this.price).toLocaleString()}vnđ</div> 
          <button class="btn btn-primary cart__item" ><i class="fa-solid fa-cart-plus"></i></button>
        </div>
      </div>      
        `;
  }
}
