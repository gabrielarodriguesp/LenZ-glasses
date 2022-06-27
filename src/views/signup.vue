<template>
  <section class='blueCard'>
    <h2 class="bold">Cadastro</h2>
    <br> <section class="line"> </section>
    <section class='innerForm'>
      <br> <span class="bold"> Nome </span>
      <br> <input type="text" maxlength="128" class="blankInput" v-model="tempClientName"> <br>
      <br> <span class="bold">E-mail </span>
      <br> <input type="email" class="blankInput" v-model="tempClientEmail" > <br>
      <br> <span class="bold"> Data de Nascimento </span> 
      <br> <input type="date" class="blankInput" v-model="tempClientDateBirth" > <br>
      <br> <span class="bold"> CPF </span>
      <br> <input type="text" class="blankInput" v-model="tempClientCPF" maxlength="11" @keypress="isNumber($event)"> <br>
      <br> <span class="bold"> Telefone </span>
      <br> <input type="tel" class="blankInput" v-model="tempClientTelephone" maxlength="11" @keypress="isNumber($event)"> <br>
      <br> <span class="bold"> CEP </span>
      <br> <input type="text" class="blankInput" v-model="tempClientCEP" maxlength="8" @keypress="isNumber($event)"> <br>
      <br> <span class="bold"> Endereço </span>
      <br> <input type="text" class="blankInput" v-model="tempClientAddress"> <br>
      <br> <br>
      <br> <span class="bold"> Senha </span>
      <br> <input type="password" class="blankInput" v-model="tempPassword0"> <br>
      <br> <span class="bold"> Repita a Senha </span>
      <br> <input type="password" class="blankInput" v-model="tempPassword1"> <br>
    </section>
    <br> <button class="importantBtn" @click="confirm()">CRIAR CONTA</button>
  </section>		
</template>

<script>
export default {
  name: 'signup',
  data(){
    return{
      tempClientName: "",
      tempClientDateBirth: "",
      tempClientCPF: "",
      tempClientTelephone: "",
      tempClientCEP: "",
      tempClientAddress: "",
      tempClientEmail: "",
      tempPassword0: "",
      tempPassword1: "",
      
      tempImgPath: 'glasses.png',
      tempProductName: "",
      tempProductType: "",
      tempProductPrice: 0.00,
      tempSize: "",
      tempSize0: "",
      tempSize1: "",
      tempSize2: "",
      tempProductDescription: "",
      tempProductCode: "",
    }
  },
  methods: {
    confirm() {
      if(this.tempPassword0 == this.tempPassword1) {
        this.clientPassword = this.tempPassword0
        this.clientName = this.tempClientName
        this.clientDateBirth = this.tempClientDateBirth
        this.clientCPF = this.tempClientCPF
        this.clientTelephone = this.tempClientTelephone
        this.clientCEP = this.tempClientCEP
        this.clientAddress = this.tempClientAddress 
        this.clientEmail = this.tempClientEmail
        alert("Conta criada com sucesso!")

      } else {
        alert("As senhas devem ser iguais!")
      }
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    }
  }
}
</script>

<style scoped>
.blueCard {
  background-color: #99D9EA;
  border-radius: 20px;
  padding: 30px;
  width: 30%;
  min-width: 430px;
  font-family: Georama, Verdana, sans-serif;
  font-size: 16px;
  box-sizing: border-box;
  margin: 40px auto;
  text-align: center;

}
.blankInput{
  height: 24px;
  border-radius: 5px;
  background-color: white;
  border: none;
  box-shadow: inset 1px 1px 3px 0px black;
  padding: 5px;
  width: 100%;
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
.line{
  width: 100%;
  height: 5px;
  background-color: black;
}
.innerForm {
  width: 60%;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}
.bold{
  font-weight: bold;
}
h2{
  font-family: Georama, Verdana, sans-serif;
  font-size: 32px;
  font-weight: 400;
}
</style>