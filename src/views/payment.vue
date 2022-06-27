<template>
    <div class="form-container">
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
      </div>
    <div class="button-register">
      <a href="#checkout">FINALIZAR COMPRA</a>
    </div>
</template>

<script>
export default {
  emits: ['addProductToCart', 'LoginLogout', 'changeQntdCart'],
  data(){
    return{
      payMethod: "cartao"
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
</style>