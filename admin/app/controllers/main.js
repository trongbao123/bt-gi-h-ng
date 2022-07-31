import Product from "../models/product.js";
import ProductServices from "../services/productService.js";
import Validation from "./validation.js";

const productSV = new ProductServices();
const validation = new Validation;

let valiCheck = () => {
   let isValid = true;
   let inputV = [];
   let inputP = [];
   let pID = [];
   let arrInput = document.querySelectorAll("#exampleModal .form-control");
   let arrP = document.querySelectorAll("#formProduct p");
   for (let i = 0; i < arrP.length; i++) {
      pID = [...pID, arrP[i].id]
   };
   for (let i = 0; i < arrInput.length; i++) {
      inputV = [...inputV, arrInput[i].value];
      if (arrInput[i].placeholder != undefined) {
         inputP = [...inputP, arrInput[i].placeholder];
      } else inputP = [...inputP, "Loại"];
   }
   for (let i = 1; i <= 8; i++) {
      isValid &= validation.emptyCheck(inputV[i], `${pID[i - 1]}`, `${inputP[i]} không được để trống`);
   }
   isValid &= validation.typeCheck("type", "typeWarning", "Chưa chọn loại");
   isValid &= validation.formatCheck(inputV[1], "nameWarning", "Tên sản phẩm chỉ bao gồm chữ không dấu, số, ( )", /^[0-9 a-zA-Z()]+$/);
   isValid &= validation.formatCheck(inputV[7], "screenWarning", "Hình ảnh phải có định dạng địa chỉ web", /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);


   return isValid;
}

let showTable = (productList) => {
   let content = "";
   for (let index in productList) {
      let { id, name, type, price, img, desc } = productList[index];
      let i = Number(index) + 1;
      content += `
      <tr>
         <td>${i}</td>
         <td>${name}</td>
         <td>${type}</td>
         <td>${Number(price).toLocaleString()} VNĐ</td>
         <td><img src="${img}" style="width:120px" alt=""></td>
         <td>${desc}</td>
         <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick="showProductDetail('${id}')">Xem</button>
            <button class="btn btn-danger" onclick="deleteProduct('${id}')">Xóa</button>
         </td>
      </tr>
      `;
   }
   document.querySelector("#tbodyProduct").innerHTML = content;

}
let getProductList = () => {
   let promise = productSV.getList();
   promise
      .then((result) => {
         showTable(result.data);
      })
      .catch((error) => {
         console.log(error);
      });
};

getProductList();

let getFormValue = () => {
   let arrControl = document.querySelectorAll("#exampleModal .form-control");
   let formValue = {};
   for (let i = 0; i < arrControl.length; i++) {
      let { id, value } = arrControl[i];
      formValue = { ...formValue, [id]: value };
   };
   console.log(formValue);
   return formValue;
};



let addProduct = () => {
   if (valiCheck()) {
      let formValue = getFormValue();
      let { name, price, screen, backCamera, frontCamera, img, desc, type } = formValue;
      let product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type);
      let promise = productSV.addProductAPI(product);
      promise
         .then((result) => {
            getProductList();
            document.querySelector("#exampleModal .close").click();
         })
         .catch((error) => {
            console.log(error);
         });
   }
}
window.addProduct = addProduct;

let showProductDetail = (id) => {
   resetWarning();
   document.querySelector("#add").classList.add("d-none");
   document.querySelector("#update").classList.remove("d-none");
   document.querySelector("#exampleModalLabel").innerHTML = "CHI TIẾT SẢN PHẨM";

   productSV.getProductDetail(id).then((result) => {
      for (const key in result.data) {
         if (document.querySelector(`#${key}`) != null) {
            document.querySelector(`#${key}`).value = result.data[key];
         }
      }
   })
      .catch((error) => {
         console.log(error);
      });
};
window.showProductDetail = showProductDetail;

let updateProduct = () => {
   let formValue = getFormValue();
   let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
      formValue;
   let product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type);

   let promise = productSV.updateProductAPI(id, product);

   promise
      .then((result) => {
         getProductList();
         document.querySelector("#exampleModal .close").click();
      })
      .catch((error) => {
         console.log(error);
      });
};
document.querySelector("#update").onclick = updateProduct;

let deleteProduct = (id) => {
   let promise = productSV.deleteProductAPI(id);

   promise
      .then((result) => {
         getProductList();
      })
      .catch((error) => {
         console.log(error);
      });
};
window.deleteProduct = deleteProduct;

let resetWarning = () => {
   let arrControl = document.querySelectorAll("#formProduct p");
   for (let i = 0; i < arrControl.length; i++) {
      document.querySelector(`#${arrControl[i].id}`).innerHTML = "";
      document.querySelector(`#${arrControl[i].id}`).style.display = "none";
   }
}

let resetForm = () => {
   document.querySelector("#update").classList.add("d-none");
   document.querySelector("#add").classList.remove("d-none");
   document.querySelector("#exampleModalLabel").innerHTML = "THÊM SẢN PHẨM MỚI";
   document.querySelector("#formProduct").reset();
   resetWarning();
}
window.resetForm = resetForm;



