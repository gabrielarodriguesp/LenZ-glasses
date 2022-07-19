<template>
  <h1>Lentes de contato</h1><br>

  <ProductPage 
    :products="this.lenses"
    @add-product-to-cart="addProductToCart"
  />
</template>

<script>
import ProductPage from '../components/products/ProductPage.vue'

export default{
  name: 'lenses',
  components:{
    ProductPage
  },
  emits: ['LoginLogout'],
  data(){
    return{
      lenses: null
    }
  },
  methods: {
    async getLens() {
      const req = await fetch('http://localhost:5000/product');
      const data = await req.json();
      
      this.lenses = Object.values(data).filter(item => item.category === 'lens');
    },
    addProductToCart(product){
      this.$emit("addProductToCart", product)
    }
  },
  created(){
    this.getLens()
  }
}
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


