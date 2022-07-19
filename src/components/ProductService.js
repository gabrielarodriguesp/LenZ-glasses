import axios from 'axios';

const url = 'http://localhost:5000/product/'

class productService {
  static getProducts() {
    return new Promise(async (resolve, reject) =>{
      try{
        const res = await axios.get(url);
        const data = res.data;
        resolve(data);
      }catch(err){
        reject(err);
      }
    })
  }

  static addProduct(product){
    return axios.post(url, {
      product
    })
  }

  static deleteProduct(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default productService