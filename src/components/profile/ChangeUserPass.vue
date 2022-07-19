<template>
  <!-- Alterar Senha -->
  <table class="blueCard"> 
    <tr>
      <td class="innerCell">Nova Senha: <input type="password" class="blankInput" v-model="tempPassword0"></td>
      <td class="innerCell">Repita a Senha: <input type="password" class="blankInput" v-model="tempPassword1"></td>
    </tr>
    <tr>
      <td> <button class="importantBtn" @click="this.$emit('backToInfo')">Voltar</button> </td>
      <td> <button class="importantBtn" @click="changePasswordConfirm()">CONFIRMAR</button> </td>
    </tr>
  </table>

</template>

<script>
import axios from 'axios';

export default {
  name: 'ChangeUserPass',
  data() {
    return{
      tempPassword0: '',
      tempPassword1: ''
    }
  },
  emits: ['backToInfo'],
  methods: {
     
    changePassword() {
      this.tempPassword0 = ""
      this.tempPassword1 = ""
    },
    changePasswordConfirm() {
      if(this.tempPassword0 == this.tempPassword1) {
        this.clientPassword = this.tempPassword0
        let userData = JSON.parse(localStorage.getItem("loginUser"))
        axios.put('http://localhost:5000/user/pass/' + userData._id, this.clientPassword)
        //http://localhost:5000/user/info/
        alert("Senha alterada com sucesso!")
        this.$emit('backToInfo')

      } else {
        alert("As senhas devem ser iguais!")
      }
    },
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

.blueCard {
  background-color: #99D9EA;
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  font-family: Georama, Verdana, sans-serif;
  font-size: 16px;
  box-sizing: border-box
}

.innerCell{
  height: 24px;
  padding-bottom: 10px;
}

</style>