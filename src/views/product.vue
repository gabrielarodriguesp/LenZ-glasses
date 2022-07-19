<template>
  <div class="container-product" v-if="product">
    <ProductImages :product="product"/>
    <ProductPrincipal 
      :product="product" 
      @add-product-to-cart="addProductToCart"
    />
    <ProductDescription :product="product"/>
  
  </div>
</template>

<script>
import ProductDescription from '../components/products/ProductDescription.vue'
import ProductPrincipal from '../components/products/ProductPrincipal.vue'
import ProductImages from '../components/products/ProductImages.vue'
import axios from 'axios';

export default {
  name: 'product',
  components: {
    ProductImages,
    ProductDescription,
    ProductPrincipal
  },
  data() {
    return{
      product: null
    }
  },
  props: {
    currProduct: String
  },
  emits: ['LoginLogout'],
  async created() {
    let res = await axios.get('http://localhost:5000/product/' + this.$route.params.id);
    this.product = res.data;
    // this.product = JSON.parse(this.currProduct)
    // this.getProduct();
  },
  methods: {
    async getProduct(){
      // this.product = await axios.get('http://localhost:5000/product/' + this.$route.params.id)

    },
    addProductToCart(){
      this.$emit("addProductToCart", this.product)
    }
  }
}
</script>


<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container-product{
  border: 2px solid #48C9B0;
  padding: 10vh 4vw;
  border-radius: 20px;
  margin: 5vh 10vw;
}

</style>