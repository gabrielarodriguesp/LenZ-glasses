<template>
  <div class="client-historic">
    <section class="blueCard" v-if="orders.length > 0">
    <h2> Data da compra: {{localizeDate(orders[indexOrder].date)}} </h2>
    <table width="80%" class="historyTable">
      <thead>
        <td>Imagem</td>
        <td>Produto</td>
        <td>Preço Unitário</td>
        <td>Qnt.</td>
        <td>Subtotal</td>
      </thead>
      <tbody class="cart-container" v-if="orders.length">
        <tr v-for="(product, index) in orders[indexOrder].products" :key="index">
          <td><img class="product-img" :src="`http://localhost:5000/product/image/${product.imgMain}`"> </td>
          
          <td> {{ product.name }} </td>
          <td> <span> R$ </span> {{ showDecimal(product.price) }} </td>
          <td> {{ product.quantity }} </td>
          <td> <span> R$ </span> {{ showDecimal(product.quantity*product.price) }} </td>
        </tr>
        <tr class="priceTotal">
          <td colspan="5">
            Total:&emsp;
            <span> R$ </span> {{ showDecimal(orders[indexOrder].totalPrice) }} 
          </td>
        </tr>
        <tr class ="priceTotal">
          <td colspan="5">
            <button class="arrowBtn" @click="indexOrder!=0 ? indexOrder-- : indexOrder=0"> 
            <!-- Botao para pagina da esquerda ou '<' (less than) -->
              &lt;   
            </button>

            
            
            <button class="arrowBtn" 
            @click="indexOrder+1 != orders.length ? indexOrder++ : indexOrder= orders.length"> 
            <!-- Botao para pagina da direita ou '>' (greater than) -->
              &gt; 
            </button>
          <p>Pagina {{indexOrder + 1}}</p>

          </td>
        </tr>

      </tbody>
    </table>
  </section>
  <h2 v-else>Nenhuma compra</h2>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ClientHistoric",
  data () {
    return {
      currentUser: null,
      orders: [],
      indexOrder: 0,
    }
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
  },
  created() {
    this.currentUser = JSON.parse(localStorage.getItem("loginUser"))
    axios.get('http://localhost:5000/user/' + this.currentUser._id).
      then(res => {
        this.orders = res.data.orders;
    })
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
span{
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