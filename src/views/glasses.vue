<template>
  <h1>Óculos de grau</h1><br>
  <ProductPage 
    :products="this.glasses"      
    @add-product-to-cart="addProductToCart"
  />
</template>

<script>
import ProductPage from '../components/products/ProductPage.vue'
import ProductCard from '../components/products/ProductCard.vue'

export default{
  name: 'glasses',
  components:{
    ProductCard,
    ProductPage
  },
  emits: ['addProductToCart', 'LoginLogout', 'changeQntdCart'],
  data(){
    return{
      glasses: null
    }
  },
  methods: {
    async getGlasses() {
      const req = await fetch('http://localhost:3000/glasses');
      const data = await req.json();
      this.glasses = data;
    },
    addProductToCart(product){
      this.$emit("addProductToCart", product)
    }
  },
  created(){
    this.getGlasses()
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
