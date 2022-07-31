export default class ProductServices {
   getList() {
       return axios({
           method: "get",
           url: "https://62a43d1e47e6e400638ea73e.mockapi.io/smartphones",
       });
   }
   addProductAPI(product) {
    return axios({
        method: "post",
        url: "https://62a43d1e47e6e400638ea73e.mockapi.io/smartphones",
        data: product,
    });
}
getProductDetail(id) {
    return axios({
        method: "get",
        url: `https://62a43d1e47e6e400638ea73e.mockapi.io/smartphones/${id}`,
    });
}

updateProductAPI(id, product) {
    return axios({
        method: "put",
        url: `https://62a43d1e47e6e400638ea73e.mockapi.io/smartphones/${id}`,
        data: product,
    });
}

deleteProductAPI(id) {
    return axios({
        method: "delete",
        url: `https://62a43d1e47e6e400638ea73e.mockapi.io/smartphones/${id}`,
    });
}
}