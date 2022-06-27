

<template>
  <!-- 
    Na 'HOME' ficam os produtos recomendados,
    que serão 3 produtos de cada categoria
    (Oculos de grau, oculos de sol e lente).

    Os produtos serão selecionados de acordo com
    a maior quantidade em estoque no momento.
   -->
  <h1>Produtos recomendados</h1><br>
  <div class="lens">
    <h2 class="title">Lentes</h2>
    <ProductPage 
      :products="this.bestLens"
      @add-product-to-cart="addProductToCart"
    />
  </div>
  <div class="sunglass">
    <h2 class="subtitle">Oculos escuros</h2>
    <ProductPage 
      :products="this.bestSunglasses"
      @add-product-to-cart="addProductToCart"
    />
  </div>
  <div class="glasses">
    <h2 class="subtitle">Oculos de grau</h2>
    <ProductPage 
      :products="this.bestGlassses"
      @add-product-to-cart="addProductToCart"
    />
  </div>
    
</template>

<script>
import ProductPage from '../components/products/ProductPage.vue'

export default{
  name: 'home',
  components:{
    ProductPage
  },
  emits: ['addProductToCart', 'LoginLogout', 'changeQntdCart'],
  data(){
    return{
      bestGlassses: null,
      bestSunglasses: null,
      bestLens: null
    }
  },
  methods: {
    compare(productA, productB) {
      if (productA.amout > productB.amout)
        return -1;
      if (productA.amout < productB.amout)
        return 1;
      return 0;
    },
    async getBestProducts() {
      const glassesData = await fetch('http://localhost:3000/glasses');
      const sunglassesData = await fetch('http://localhost:3000/sunglasses');
      const lensData = await fetch('http://localhost:3000/lens');
      
      let glasses = await glassesData.json();
      let sunglasses = await sunglassesData.json();
      let lens = await lensData.json();

      // 3 Maiores em relação a quantidade de estoque
      this.bestGlassses = glasses.sort(this.compare).slice(0, 3);
      this.bestSunglasses = sunglasses.sort(this.compare).slice(0, 3);
      this.bestLens = lens.sort(this.compare).slice(0, 3);

    },
    addProductToCart(product){
      this.$emit("addProductToCart", product)
    },
  },
  mounted(){
    this.getBestProducts();
  }
}
</script>

<style scoped>
h1, h2{
  text-align: center;
  color: #424949;
  font-family: 'Lobster', cursive;
  font-weight: lighter;
}
h1{
  margin: 50px auto;
  font-size: 60px;
  line-height: 40px;
}

h2{
  font-size: 40px;
  line-height: 30px;
}


@media (max-width: 1000px){
  .subtitle{
    margin-top: 200px;
  }
  
}

</style>