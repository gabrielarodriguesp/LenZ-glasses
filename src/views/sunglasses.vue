<template>
  <h1>Óculos de Sol</h1><br>
  
  <div class="sunglasses-container">
    <ProductCard
      v-for="sung in sunglasses"
      :key="sung.id"
      :product="sung"
      @add-product="addProductToCart(sung)"
    />

  </div>
  
</template>

<script>
import ProductCard from '../components/products/ProductCard.vue'

export default{
  name: 'sunglasses',
  components:{
    ProductCard
  },
  emits: ['addProductToCart', 'LoginLogout', 'changeQntdCart'],
  data(){
    return{
      sunglasses: null
    }
  },
  methods: {
    async getSunGlasses() {
      const req = await fetch('http://localhost:3000/sunglasses');
      const data = await req.json();
      this.sunglasses = data;
    },
    addProductToCart(product){
      this.$emit("addProductToCart", product)
    }
  }, 
  created(){
    this.getSunGlasses()
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

.sunglasses-container{
  margin: 0% 15% 10% 15%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5%;
  grid-row-gap: 5%;
}

@media (max-width: 1500px) {
  .sunglasses-container{
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 1000px) {
  .sunglasses-container{
    grid-template-columns: 1fr;
  }
}
</style>


