import SanPham from "../models/SanPham.js";
import SanPhamService from "../services/SanPhamService.js";

const sanphamsv = new SanPhamService();
var SPList = [];
// lưu dữ liệu
let setLocalStorage = () => {
  localStorage.setItem("DSSP", JSON.stringify(SPList));
};

// lấy dữ liệu
let getLocalStorage = () => {
  if (localStorage.getItem("DSSP") != null) {
    //lấy được localStorage
    SPList = JSON.parse(localStorage.getItem("DSSP"));
  }
};
// show toàn bộ sp
function ShowSP() {
  let contentHTML = "";
  SPList.map((item, index) => { 
    contentHTML +=   `<div class="col-3 mt-5">
              ${item.showSPHTML()}
           </div>` 
   if (item.type == "Samsung") {
        document.getElementById('samsunglist').innerHTML += `
        <div class="col-3 mt-5">
           ${item.showSPHTML()}
        </div>
        `;    
     }
     else if (item.type == "Iphone") {
      document.getElementById("iphonelist").innerHTML += `
      <div class="col-3 mt-5">
         ${item.showSPHTML()}
      </div>
      `;
     }
  }); 
  document.getElementById("splist").innerHTML = contentHTML;
  addtocart();
}






// thực hiện
function GetSp() {
  console.log("2");
  let promise = sanphamsv.getList();
  console.log("3");

  promise
    .then((result) => {
      console.log("5");

      result.data.map((item, index) => {
        let { name, price, manhinh, camera, frontCamera, img, desc, type, id } =
          item;
        let itemSP = new SanPham(
          name,
          price,
          manhinh,
          camera,
          frontCamera,
          img,
          desc,
          type,
          id
        );
        SPList.push(itemSP);
     
        
      });
      ShowSP();
      
      setLocalStorage();
      getLocalStorage();
    })
    .catch((error) => {
      // console.log("error: ", error);
    });
}
GetSp();

// tạo giỏ hàng
var cartItem = {
  product: { id: 1, name: "iphonex", price: 100000 },
  quantity: 1,
};
var arrcart = [];

// hàm thêm sp
let addtocart=()=>{
  console.log("6");
  const arrbutton = document.querySelectorAll(".cart__item");
  for (let i = 0; i < arrbutton.length; i++) {
    arrbutton[i].addEventListener("click", () => {
      cartItem = { ...SPList[i] };
      // console.log(SPList[i], "sản phẩm");
      // arrcart.push(cartItem);

      console.log(arrcart, "6");

      let productFind = arrcart.find((product) => product.id == cartItem.id);
      // console.log(productFind);

      if (productFind) {
        productFind.quantity += 1;
      } else {
        let productGH = { ...cartItem, quantity: 1 };
        arrcart.push(productGH);
        console.log("thong tin cua sp: ", SPList[i]);
      }

      showTable();
   
    });
  }
}; 
document.getElementsByClassName("cart__item").onclick = addtocart();
// render giỏ hàng
function showTable(product) {
  let content = "";

  arrcart.map((item, index) => {
    let { name, price, quantity } = item;
    let i = Number(index) + 1;
    content += `
    <tr>
       <td style="width:120px">${i} </td>
       <td>${name}</td>
       <td>
       <button class="btn btn-danger" onclick="tanggiamsl('${
         item.id
       }','-1')" >-</button>
       <span>${quantity}</span>
       <button class="btn btn-success" onclick="tanggiamsl('${
         item.id
       }','1')">+</button>
       </td>
       <td>${Number(price).toLocaleString()} VNĐ</td>
       <td>${Number(price * quantity).toLocaleString()}vnd</td>
       <td><button class="btn btn-danger" onclick="xoagiohang()">xóa</button></td>
    </tr>
    `;
  });
  document.getElementById("tbodyProduct").innerHTML = content;
}

// hàm  tăng giảm sl
let tanggiamsl = (id, sl) => {
  // console.log(sl, "tăng")
  let productFind = arrcart.find((product) => product.id == id);
  console.log(productFind);

  if (productFind) {
    productFind.quantity += Number(sl);
    if (productFind.quantity < 1) {
      alert("số lượng không hợp lệ");
      productFind.quantity = 1;
    }
  }
  showTable();
};
window.tanggiamsl = tanggiamsl;

// tìm vị trí xóa
let timViTri = () => {
  var viTri = -1;
  arrcart.map((item, index) => {
    if (item) {
      //nếu tìm thấy
      viTri = index;
    }
  });

  return viTri;
};

// hàm xóa giỏ hàng
let xoagiohang = (item) => {
  let viTriXoa = timViTri(item);
  if (viTriXoa > -1) {
    //tìm thấy
    arrcart.splice(viTriXoa, 1);
  }
  showTable(item);
};
window.xoagiohang = xoagiohang;

// hàm reset
let resetgiohang = () => {
  document.getElementsByTagName("form")[0].reset();
};
window.resetgiohang = resetgiohang;
