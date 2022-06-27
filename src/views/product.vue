<template>
  <div class="container-product">
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
  emits: ['addProductToCart', 'LoginLogout', 'changeQntdCart'],
  created() {
    console.log(this.currProduct)
    this.product = JSON.parse(this.currProduct)
  },
  methods: {
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
  /* background-color: #48C9B0; */
  padding: 10vh 4vw;
  border-radius: 20px;
  margin: 5vh 10vw;
}

</style>