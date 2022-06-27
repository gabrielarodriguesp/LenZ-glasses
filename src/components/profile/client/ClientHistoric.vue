<template>
  <div class="client-historic">
    <section class="blueCard" >
    <h2> Data da compra: {{localizeDate(purchase[indexCompra].datePurchase)}} </h2>
    <table width="80%" class="historyTable">
      <thead>
        <td></td>
        <td>Produto</td>
        <td>Preço Unitário</td>
        <td>Qnt.</td>
        <td>Subtotal</td>
      </thead>

      <tbody class="cart-container">
        <tr v-for="(product, index) in purchase[indexCompra].products" :key="index">
          <td><img class="product-img" :src="require(`../../../assets/products/img/${product.imgPath}`)"> </td>
          <td> {{ product.name }} </td>
          <td> <span class="bold"> R$ </span> {{ showDecimal(product.price) }} </td>
          <td> {{ product.quantity }} </td>
          <td> <span class="bold"> R$ </span> {{ showDecimal(product.quantity*product.price) }} </td>
        </tr>
        <tr class = priceTotal>
          <td colspan="5">
            Total:&emsp;
            <span class="bold"> R$ </span> {{ showDecimal(purchase[indexCompra].totalPrice) }} 
          </td>
        </tr>
        <tr class = priceTotal>
          <td colspan="5">
            <button id='leftArrowBtn' :class="this.leftArrowBtn" @click="minusPurchaseIndex(); sumTotalPrice();"> &lt; </button>
            <button id='rightArrowBtn' :class="this.rightArrowBtn" @click="plusPurchaseIndex(); sumTotalPrice();"> &gt; </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section> 
  </div>
</template>

<script>
export default {
  name: "ClientHistoric",
  data () {
    return {
      indexCompra: 0,
      leftArrowBtn: 'disabledArrowBtn',
      rightArrowBtn: 'arrowBtn',
      indexCompra: 0,
      purchase: [
          {
            datePurchase: "2022-07-24",
            totalPrice: 0,
            products: [
              {
                imgPath: 'glasses.png',
                name: "Oculos X",
                price: 100.00,
                quantity: 6,
              },
              {
                imgPath: 'sunglasses-1.png',
                name: "Oculos Y",
                price: 150.00,
                quantity: 2,
              },
              {
                imgPath: 'sunglasses-2.png',
                name: "Oculos Z",
                price: 200.00,
                quantity: 1,
              },	
            ],
          },
          {
            datePurchase: "2021-06-23",
            totalPrice: 0,

            products: [
              {
                imgPath: 'sunglasses-3.png',
                name: "Oculos A",
                price: 50.00,
                quantity: 4,
              },
              {
                imgPath: 'sunglasses-4.png',
                name: "Oculos B",
                price: 12.99,
                quantity: 2,
              },
            ],
          },
        ],
    }
  },
  methods: {
    minusPurchaseIndex() {
      this.indexCompra--
      if (this.indexCompra == 0) {
        document.getElementById('leftArrowBtn').disabled = true
        this.leftArrowBtn = 'disabledArrowBtn'
      }
      document.getElementById('rightArrowBtn').disabled = false
      this.rightArrowBtn = 'arrowBtn'
    },
    plusPurchaseIndex() {
      this.indexCompra++
      if (this.indexCompra == this.purchase.length-1) {
        document.getElementById('rightArrowBtn').disabled = true
        this.rightArrowBtn = 'disabledArrowBtn'
      }
      document.getElementById('leftArrowBtn').disabled = false
      this.leftArrowBtn = 'arrowBtn'
    },
    sumTotalPrice() {
      this.purchase[this.indexCompra].totalPrice = 0
      for (let i = 0; i < this.purchase[this.indexCompra].products.length; i++) {
        this.purchase[this.indexCompra].totalPrice = this.purchase[this.indexCompra].totalPrice + 
        this.purchase[this.indexCompra].products[i].quantity*this.purchase[this.indexCompra].products[i].price
      }
    },
  },
  computed: {
    showDecimal(){
      return(number)=>{
        return parseFloat(number).toFixed(2)
      }
    },
    localizeDate(){
      return(date)=>{
        if (!date || !date.includes('-')) {
          return date
      }
        const [yyyy, mm, dd] = date.split('-')
        return `${dd}/${mm}/${yyyy}`
      }
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

.client-historic{
  width: 65vw;
}

.arrowBtn{
  background-color: #3649F5;
  border: none; 
  border-radius: 5px;
  text-align: center;
  width: 60px;
  height: 30px;
  color: white;
  font-weight: bold;
  font-family: Georama, Verdana, sans-serif;
}
.disabledArrowBtn{
  background-color: #CCD1D1;
  border: none; 
  border-radius: 5px;
  text-align: center;
  width: 60px;
  height: 30px;
  color: white;
  font-weight: bold;
  font-family: Georama, Verdana, sans-serif;
}
.priceTotal{
  background-color: #99D9EA;
  text-align: right;
  padding-right: 10%;
  font-size: 32px;
}
.bold{
  font-weight: bold;
}
.product-img{
  width: 75px;
  height: 75px;
}

.historyTable{
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
			
h2{
  font-family: Georama, Verdana, sans-serif;
  font-size: 32px;
  font-weight: 400;
}

.cart-container{
  width: 80%;
  background-color: white;
}
</style>