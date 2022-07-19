<template>
  <div class="user-info" v-if="showSection=='info' && user.info">
    <table class="blueCard" v-if="sectionSwitch==3">
      <tr> <td colspan="3" class="innerCell"><span class="bold">Nome: </span> {{ user.info.name }} </td></tr>
      <tr>
        <td class="innerCell"><span class="bold"> Data de Nascimento: </span> {{ localizeDate(user.info.birthday) }}</td>
        <td class="innerCell"><span class="bold"> CPF: </span> {{ showCPF(user.info.CPF) }} </td>
        <td class="innerCell"><span class="bold"> Telefone: </span> {{ showTelephone(user.info.CPF) }} </td>
     
     </tr> 
 
 <tr>
        <td class="innerCell" colspan="2"> <span class="bold">EMAIL: </span> {{ user.email }} </td>
        <td class="innerCell"><span class="bold"> CEP: </span> {{ showCEP(user.info.CEP) }}</td>

</tr>
      <tr>
        <td class="innerCell" colspan="3"><span class="bold"> Endereço: </span> {{ user.info.address }}</td>
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
    />

  </div>
</template>

<script>
import ChangeUserPass from './ChangeUserPass.vue'
import ChangeUserInfo from './ChangeUserInfo.vue'
import axios from 'axios';

export default {
  name: "UserInfo",
  components: {
    ChangeUserPass,
    ChangeUserInfo
  },
  
  data() {
    return {
      user: {
        email: "",
        password: "",
        buys: [],
        info: {
          name: "",
          birthday: "",
          CPF: "",
          tel: "",
          CEP: "",
          address: "",
        }
      
      },

      showSection: 'info',

      sectionSwitch:3,
      sectionTitle: "Informações",

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
        if(str){
          if (str.includes('.') && str.includes('-')) {
            return str
          }
          let substr = str.match(/[0-9]{1,3}/g);
            return substr[0]+"."+substr[1]+"."+substr[2]+"-"+substr[3]
      
        }
      }
    },
    showTelephone(){
      return(str)=>{
        if(str){
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
      }
    },

    showCEP(){
      return(str)=>{
        if(str){
          if (str.includes('-')) {
            return str
          }
          let substr = str.match(/[0-9]{1,5}/g);
          return substr[0]+"-"+substr[1]
      
        }
      }
    }
  },
  async mounted() {
    let userData = JSON.parse(localStorage.getItem("loginUser"));
    let res = await axios.get('http://localhost:5000/user/' + userData._id);
    this.user = res.data
    console.log(this.user)
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