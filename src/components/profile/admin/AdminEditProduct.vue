<template>
  <div class="admin-edit-product">
    <section class="blueCard horizontalCenter">
      <span class="bold"> Código do Produto: </span> 
      <input type="text" class="blankInput" v-model="searchCode"> <br> <br>
      <button class="importantBtn" @click="searchProduct()">PROCURAR</button> <br>
      <h2 v-show='searchError'> Não há um produto com este código! </h2>
    </section> 
  </div>  
</template>

<script>
export default {
  name: "AdminEditProduct",
  data() {
    return {
      searchCode: "",
      searchError: false,
      products: [
        {
          imgPath: '../assets/products/img/glasses.png',
          productName: "Oculus X",
          productType: "grau",
          productPrice: 100.00,
          size: "0-0-0",
          productDescription: "Um óculus perfeito para o dia-a-dia agitado.",
          productCode: "0A2B3C4D"
        },
        {
          imgPath: '../assets/products/img/glasses.png',
          productName: "Oculus A",
          productType: "sol",
          productPrice: 250.00,
          size: "0-0-0",
          productDescription: "Seja a inveja de todos seus amigos na praia.",
          productCode: "1A2B3C4D"
        },
      ]
    }
  },
  methods: {
    searchProduct() {
      for (let i = 0; i < this.products.length; i++) {
        if(this.searchCode == this.products[i].productCode) {
          console.log('achou!')
          this.searchError = false
          return
        }
      }
      this.searchError = true
    },
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