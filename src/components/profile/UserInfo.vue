<template>
  <div class="user-info" v-if="showSection=='info'">
    <table class="blueCard" v-if="sectionSwitch==3">
      <tr> <td colspan="3" class="innerCell"><span class="bold">Nome: </span> {{ userName }} </td></tr>
      <tr>
        <td class="innerCell"><span class="bold"> Data de Nascimento: </span> {{ localizeDate(userDateBirth) }}</td>
        <td class="innerCell"><span class="bold"> CPF: </span> {{ showCPF(userCPF) }} </td>
        <td class="innerCell"><span class="bold"> Telefone: </span> {{ showTelephone(userTelephone) }} </td>
      </tr> 
      <tr>
        <td class="innerCell" colspan="2"> <span class="bold">EMAIL: </span> {{ userEmail }} </td>
        <td class="innerCell"><span class="bold"> CEP: </span> {{ showCEP(userCEP) }}</td>
      </tr>
      <tr>
        <td class="innerCell" colspan="3"><span class="bold"> Endereço: </span> {{ userAddress }}</td>
      </tr>
      <tr>
        <td class="innerCell"></td>
      </tr>
      <tr>
        <td  colspan="2" class="innerCell"> 
          <button class="importantBtn changeInfo" @click="this.showSection='changeInfo'">
            ALTERAR INFORMAÇÕES
          </button> 
        </td>
        
        <td  colspan="2" class="innerCell"> 
          <button class="importantBtn" @click="this.showSection='changePass'">
            ALTERAR SENHA
          </button> 
        </td>

        <!-- <td colspan="2" class="innerCell">
          <input type="button" value="ALTERAR INFORMAÇÕES" class='rightBtn' @click="this.showSection='changeInfo'">
          <input type="button" value="ALTERAR SENHA" class='rightBtn' @click="this.showSection='changePass'"> 
        </td> -->
      </tr>
    </table>
  </div>  
  <div class="change-info" v-if="showSection=='changeInfo'">
    <ChangeUserInfo
      @backToInfo="this.showSection='info'"
    />
  </div>

  <div class="change-pass" v-if="showSection=='changePass'">
    <ChangeUserPass
      @backToInfo="this.showSection='info'"
      :userName="this.userName"
      :userDateBirth="this.userDateBirth"
      :userCPF="userCPF"
      :userTelephone="userTelephone"
      :userCEP="userCEP"
      :userAddress="userAddress"
      :userEmail="userEmail"
      :userPassword="userPassword"
    />
  </div>
</template>

<script>
import ChangeUserPass from './ChangeUserPass.vue'
import ChangeUserInfo from './ChangeUserInfo.vue'

export default {
  name: "UserInfo",
  components: {
    ChangeUserPass,
    ChangeUserInfo
  },
  data() {
    return {
      showSection: 'info',

      sectionSwitch:3,
      sectionTitle: "Informações",

      userName: "Fulano Beltrano da Silva",
      userDateBirth: "2013-05-07",
      userCPF: "12345678901",
      userTelephone: "1234567890",
      userCEP: "01234567",
      userAddress: "Rua exemplar de exemplo do exemplo exemplar, número 123, complemento 12, bloco 2",
      userEmail: "fulano.beltrano.da.silva@email.com",
      userPassword: "password",

      
      tempClientName: "",
      tempClientDateBirth: "",
      tempClientCPF: "",
      tempClientTelephone: "",
      tempClientCEP: "",
      tempClientAddress: "",
      tempClientEmail: "",
      tempPassword0: "",
      tempPassword1: "",
    }
  },
  computed: {
    localizeDate(){
      return(date)=>{
        if (!date || !date.includes('-')) {
          return date
      }
        const [yyyy, mm, dd] = date.split('-')
        return `${dd}/${mm}/${yyyy}`
      }
    },
    showDecimal(){
      return(number)=>{
        return parseFloat(number).toFixed(2)
      }
    },
    
    showCPF(){
      return(str)=>{
        if (str.includes('.') && str.includes('-')) {
          return str
        }
        let substr = str.match(/[0-9]{1,3}/g);
          return substr[0]+"."+substr[1]+"."+substr[2]+"-"+substr[3]
      }
    },
    showTelephone(){
      return(str)=>{

        if (str.includes('-')) {
          return str
        }
        if(str.length == 10) {
          let substr = str.match(/[0-9]{1,2}/g);
          return '('+substr[0]+')'+substr[1]+substr[2]+"-"+substr[3]+substr[4]
        } else {
          let substrBigger = str.match(/.{1,7}/g);
          let substrSmaller = substrBigger[0].match(/[0-9]{1,2}/g);
          return '('+substrSmaller[0]+')'+substrSmaller[1]+substrSmaller[2]+substrSmaller[3]+"-"+substrBigger[1]
        }
      }
    },

    showCEP(){
      return(str)=>{
        if (str.includes('-')) {
          return str
        }
        let substr = str.match(/[0-9]{1,5}/g);
        return substr[0]+"-"+substr[1]
      }
    }
  },
 

  methods: {

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
  height: 40px;
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
.bold{
  font-weight: bold;
}
.innerCell{
  height: 24px;
  padding-bottom: 10px;
}
</style>