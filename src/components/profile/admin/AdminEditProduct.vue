<template>
  <div class="admin-edit-product">
    <!-- 
      Mostra lista de produtos disponiveis para editar,
      sendo possivel escolher um.
    -->
    <section v-if="!this.selectedProduct" >
      <ProductsToEdit v-if="products"
        :products="products"
        @selected-product="selectProductToEdit"
      />
    </section>
    <!-- 
      Caso tenha escolhido um produto para editar,
      Mostra o formulario para alterar seus detalhes.      
    -->
    <section v-else>
      <h1> Alterar somente a parte que desejar diferente!</h1>
      <ProductForm 
        @product-info="editProduct"
        :newProduct="false"
      />
    </section>
  </div>  
</template>

<script>
import ProductService from '../../ProductService.js';
import ProductForm from '../../products/ProductForm.vue';
import ProductsToEdit from '../../products/ProductsToEdit.vue';
import axios from 'axios';

export default {
  name: "AdminEditProduct",
  emits: ["selectedProduct", "productInfo"],
  components: {
    ProductsToEdit,
    ProductForm
  },
  data() {
    return {
      products: null,
      selectedProduct: null
    }
  },
  methods: {
    selectProductToEdit(product) {
      this.selectedProduct = product
    },

    editProduct(product) {
      for(var prop in product) {
        if(!product[prop]){
          product[prop] = this.selectedProduct[prop];
        }
      }
      axios.put('http://localhost:5000/product/' + this.selectedProduct._id, product)
    },
    
  },
  async mounted(){
    try{
      this.products = await ProductService.getProducts();
    }catch(err){
      console.log(err)
    }
  }
}
</script>

<style scoped>
.blueCard {
  background-color: #99D9EA;
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  font-family: Georama, Verdana, sans-serif;
  font-size: 16px;
  box-sizing: border-box
}

.bold{
  font-weight: bold;
}

.blankInput{
  height: 24px;
  border-radius: 5px;
  background-color: white;
  border: none;
  box-shadow: inset 1px 1px 3px 0px black;
  padding: 5px;
  width: 70%;
}
.importantBtn{
  background-color: #3649F5;
  border: none; 
  border-radius: 20px;
  text-align: center;
  width: 150px;
  height: 35px;
  color: white;
  font-weight: bold;
  font-family: Georama, Verdana, sans-serif;
}

h2{
  font-family: Georama, Verdana, sans-serif;
  font-size: 32px;
  font-weight: 400;
}


</style>