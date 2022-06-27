<template>
     						
  <!-- Alterar Informações -->
  <table class="blueCard">
    <tr> 
      <td colspan="3" class="innerCell">
        <span class="bold">Nome: </span> 
        <input type="text" maxlength="128" class="blankInput" v-model="tempUserName">
      </td>
    </tr>
    <tr>
      <td class="innerCell">
        <span class="bold"> Data de Nascimento: </span> 
        <input type="date" class="blankInput" v-model="tempUserDateBirth" >
      </td>
      <td class="innerCell">
        <span class="bold"> CPF: </span>
        <input type="text" class="blankInput" v-model="tempUserCPF" maxlength="11" @keypress="isNumber($event)"> 
      </td>
      <td class="innerCell">
        <span class="bold"> Telefone: </span>
          <input type="tel" class="blankInput" v-model="tempUserTelephone"  maxlength="11" @keypress="isNumber($event)"> 
      </td>
    </tr> 
    <tr>
      <td class="innerCell" colspan="2">
        <span class="bold">EMAIL: </span>
        <input type="email" class="blankInput" v-model="tempUserEmail" > 
    </td>
      <td class="innerCell">
        <span class="bold"> CEP: </span>
        <input type="text" class="blankInput" v-model="tempUserCEP" maxlength="8" @keypress="isNumber($event)">
      </td>
    </tr>
    <tr>
      <td class="innerCell" colspan="2">
        <span class="bold"> Endereço: </span>
        <input type="text" class="blankInput" v-model="tempUserAddress">
      </td>
    </tr>
    <tr>
      <td colspan="2"> <button class="importantBtn" @click="this.$emit('backToInfo')">Voltar</button> </td>
      <td class="innerCell"> <button class="importantBtn" @click="changeInfoConfirm()">CONFIRMAR</button> </td>
    </tr>
  </table>

</template>

<script>
export default {
  name: 'ChangeUserInfo',
  props: {
    userName: String,
    userDateBirth: String,
    userCPF: String,
    userTelephone: String,
    userCEP: String,
    userAddress: String,
    userEmail: String,
    userPassword: String,
  },
  data () {
    return {
      tempUserName: "",
      tempUserDateBirth: "",
      tempUserCPF: "",
      tempUserTelephone: "",
      tempUserCEP: "",
      tempUserAddress: "",
      tempUserEmail: "",
      tempPassword0: "",
      tempPassword1: "",
    }
  },
  methods: {
    changeInfoConfirm() {
      console.log('NOME É ' + this.tempUserName)
      // userName = this.tempUserName
      // userDateBirth = this.tempUserDateBirth
      // userCPF = this.tempUserCPF
      // userTelephone = this.tempUserTelephone
      // userCEP = this.tempUserCEP
      // userAddress = this.tempUserAddress 
      // userEmail = this.tempUserEmail
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.tempUserName = this.userName
    this.tempUserDateBirth = this.userDateBirth
    this.tempUserCPF = this.userCPF
    this.tempUserTelephone = this.userTelephone
    this.tempUserCEP = this.userCEP
    this.tempUserAddress = this.userAddress
    this.tempUserEmail = this.userEmail
  }
}
</script>


<style scoped>
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
.distance {
  width: 10%;
}
.line{
  width: 100%;
  height: 5px;
  background-color: black;
}
.leftCol {
  width: 20%;
  font-family: Georama, Verdana, sans-serif;
}
.leftBtn {
  background-color: white;
  border: 1px solid black; 
  text-align: right;
  width: 220px;
}
.rightBtn {
  font-family: Georama, Verdana, sans-serif;
  font-size: 16px;
  background-color: #99D9EA;
  border: none;
  color: #3649F5;
  text-decoration-line: underline;
}
.outer {
  width: 85%;
  min-width: 1300px;
  margin: auto;
  border: 1px solid black;

}
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
.horizontalCenter {
  text-align: center;
}
.innerCell{
  height: 24px;
  padding-bottom: 10px;
}
h1{
  font-family: "Lobster Two";
  text-align: center;
}
h2{
  font-family: Georama, Verdana, sans-serif;
  font-size: 32px;
  font-weight: 400;
}
</style>