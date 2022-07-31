export default class SanPhamService {
  getList() {
    return axios({
      method: "get",
      url: "https://62a43d1e47e6e400638ea73e.mockapi.io/smartphones",
    });
  }
}
