<template>
    <div class="form-container" v-if="!sucess">
      <form>
        <div class="payment-method pay-form">
          <h2>FORMA DE PAGAMENTO</h2><br>
            <input type="radio" v-model="payMethod" name="paymethod" value="cartao">Cartão
            <input type="radio" v-model="payMethod" name="paymethod" value="boleto">Boleto
            <input type="radio" v-model="payMethod" name="paymethod" value="pix">PIX
          <br>
        </div>
        <div class="billing-addres pay-form">
          <h2>DADOS DA COBRANÇA</h2><br>
          
          <label>Nome</label><input type="text" size="40" placeholder="NOME"><br>
          <label>CPF</label><input type="text" id="cpf" placeholder="CPF"><br>
          <label>endereço</label><input type="text" id="endereco" size="40" placeholder="ENDEREÇO">
          <label>Nº</label><input type="text" id="num" size="6" placeholder="Nº"><br>
        </div>
        
        <div v-if="this.payMethod=='cartao'" class="card-info pay-form">
          <h2>INFORMAÇÕES DO CARTÃO</h2><br>
          <label>Titular do cartão</label><input type="text" size="25" placeholder="TITULAR DO CARTÃO"><br>
          <label>Número do cartão</label><input type="text" size="25" placeholder="NÚMERO CARTÃO"><br>
          <label>CVV</label><input type="text" size="5" placeholder="CVV">
          <label>Data de expiração</label><input type="text" size="5" placeholder="">
        </div>
        </form>
      <button class="button-register" @click="checkout()">
        FINALIZAR COMPRA
      </button>

      </div>
      <h3 v-else>
        Compra realizada com sucesso!
      </h3>
</template>

<script>
import axios from 'axios';

export default {
  emits: ['LoginLogout'],
  data(){
    return{
      payMethod: "cartao",
      userID: null,
      oldOrders: [],
      cartItens: null,

      sucess: false

    }
  },
  created() {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"))
    this.userID = loginUser._id;

    this.cartItens = JSON.parse(localStorage.getItem("cartItens"))


    axios.get('http://localhost:5000/user/' + this.userID).then(res => {
      this.oldOrders = res.data.orders
    })
  },
  methods: {

    formatDate(format) {
      const today = new Date();

      const map = {
        mm: today.getMonth() + 1,
        dd: today.getDate(),
        aaaa: today.getFullYear()
      }

      return format.replace(/mm|dd|aaaa/gi, matched => map[matched])
    },
    getTotalPrice(cart){
      let sum = 0;
      for(let i = 0; i < cart.length; i++){
        sum += cart[i].price * cart[i].qntdCart;
      }
      return sum;
    },
    getProductInfo(cart){
      let products = []

      for(let i = 0; i < cart.length; i++){
        products.push({
          name: cart[i].name,
          imgMain: cart[i].imgs[0],
          price: cart[i].price,
          quantity: cart[i].qntdCart,
        })
      }
      return (products);

      
    },

    checkout() {

      const date = this.formatDate('aaaa-mm-dd')
      const totalPrice = this.getTotalPrice(this.cartItens)
      const products = this.getProductInfo(this.cartItens)

      let order = {
        date: date,
        totalPrice: totalPrice,
        products: products
      }
      for(let i = 0; i < this.cartItens.length; i++){
        let newQntdProduct ={
          amount: this.cartItens[i].amount - this.cartItens[i].qntdCart
        } 
        axios.put('http://localhost:5000/product/amount/' + this.cartItens[i]._id, newQntdProduct)
      }
      axios.put('http://localhost:5000/user/order/' + this.userID, order)

      localStorage.removeItem("cartItens")
      this.sucess = true;

alert('Compra realizada com sucesso!')

    }
  }
}
</script>

<style scoped>
h2, a{
  text-align: center;

  font-family: 'Lilita One', cursive;
  text-decoration: none;
  color: #4D5656;
}
.pay-form{
  width: 520px;
	margin:50px auto ;
	border-radius: 10px;
  border: 2px solid #4D5656;
  padding: 30px;
} 
.payment-method{
  text-align: center;
}
.billing-addres label{
  margin: 15px;
  float: left;
  width: 70px;
}
input{
  vertical-align: middle;
	border-radius: 10px;
	height: 30px;
	margin: 10px;
}
.button-register{
  width: 250px;
  height: 45px;
  background-color: #99D9EA;
  border-radius: 15px;
  float: right;
  text-align: center;
  margin-right: 30%;
  margin-bottom: 50px;
  line-height: 40px;
}

a:hover{
  color: black;
  border-color: #4D5656;
  border-bottom: 2px solid #4D5656;
}
.button-register:hover{
  box-shadow: 0px 5px 5px gray;
  background-color: #48C9B0;
  cursor: pointer;
}


h3{
  text-align: center;
  font-family: 'Lilita One';
  text-decoration: none;
  color: #4D5656;
}
</style>