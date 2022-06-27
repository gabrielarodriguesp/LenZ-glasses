<template>
  <div class="products-container">
    <ProductCard
      v-for="currProduct in products"
      :key="currProduct.id"
      :product="currProduct"
      
      @add-product="addProductToCart(currProduct)"
    />
  </div>
    
</template>

<script>
import ProductCard from './ProductCard.vue'


export default {
  name: "ProductPage",
  props: ['products'],
  components: {
    ProductCard
  },

  methods: {
    addProductToCart(product){
      this.$emit('addProductToCart', product);
    }
  },
}
</script>

<style scoped>

</style>

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

.products-container{
  margin: 0% 15% 10% 15%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5%;
  grid-row-gap: 5%;
}


@media (max-width: 1500px) {
  .products-container{
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 1000px) {
  .products-container{
    grid-template-columns: 1fr;
  }
}


</style>


