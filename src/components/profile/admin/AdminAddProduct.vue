<template>
  <div class="admin-add-product">
  <!-- Adicionar Produto -->
  <ProductForm 
    @product-info="newProduct"
    :newProduct="true"
  />
  </div>  
</template>

<script>
import axios from 'axios';
import ProductForm from '../../products/ProductForm.vue'

export default {
  name: "AdminAddProduct",
  components: {
    ProductForm
  },

  data() {
    return {

    }
  },
  methods: {
    
    randomCode() {
      let code = [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      this.ProductCode = code.toUpperCase()
    },
    newProduct(product){
      const formData = new FormData();
      for(let i = 0; i < product.images.length; i++){
        formData.append('file', product.images[i]);
      }
      formData.append('name', product.name);
      formData.append('amount', product.amount);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('warranty', product.warranty);
      formData.append('description', JSON.stringify(product.description));
      
      const headers = { 'Content-Type': 'multipart/form-data' };
      axios.post('http://localhost:5000/product/', formData, { headers })

      alert('Produto adicionado com sucesso!')
        this.$router.push('/');
    }
    
  }
}
</script>

<style scoped>


</style>