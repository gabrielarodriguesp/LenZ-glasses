<template>
  <div>
    <h1>Resultado da pesquisa para '{{$route.params.name}}'</h1><br>
    <ProductPage 
      :products="this.products"      
      @add-product-to-cart="addProductToCart"
    />
  </div>
</template>

<script>
import ProductPage from '../components/products/ProductPage.vue'

export default ({
  components:{
    ProductPage
  },
  data() {
    return{
      products: null
    }
  },
  
  // Recebe dados de todos os produtos e 
  // filtra com base no nome que o cliente deseja procurar
  async mounted() {
    const req = await fetch('http://localhost:5000/product');
    const data = await req.json();
    const searchName = (this.$route.params.name).toLowerCase();

    this.products = Object.values(data).filter(product => 
        (product.name.toLowerCase()).includes(searchName));
    return;
  },
  methods: {
    addProductToCart(product){
      this.$emit("addProductToCart", product);
      return;
    }
  }
})
</script>


<style scoped>
h1{
  text-align: center;
  margin: 100px;
  color: #424949;
  font-family: 'Lobster', cursive;
  font-weight: lighter;
  font-size: 60px;
  line-height: 40px;
}
</style>