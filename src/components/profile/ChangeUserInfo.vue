<template>
     						
  <!-- Alterar Informações -->
  <table class="blueCard">
    <tr> 
      <td colspan="3" class="innerCell">
        <span class="bold">Nome: </span> 
        <input type="text" maxlength="128" class="blankInput" v-model="state.userTemp.info.name">
        <p v-if="v$.userTemp.info.name.$error"> {{v$.userTemp.info.name.$errors[0].$message}}</p>

      </td>
    </tr>
    <tr>
      <td class="innerCell">
        <span class="bold"> Data de Nascimento: </span> 
        <input type="date" class="blankInput" v-model="state.userTemp.info.birthday" >
        <p v-if="v$.userTemp.info.birthday.$error"> {{v$.userTemp.info.birthday.$errors[0].$message}}</p>
      </td>
      <td class="innerCell">
        <span class="bold"> CPF: </span>
        <input type="text" class="blankInput" v-model="state.userTemp.info.CPF" maxlength="11" > 
      <p v-if="v$.userTemp.info.CPF.$error"> {{v$.userTemp.info.CPF.$errors[0].$message}}</p>
      </td>
      <td class="innerCell">
        <span class="bold"> Telefone: </span>
          <input type="tel" class="blankInput" v-model="state.userTemp.info.tel"  maxlength="11"> 
          <p v-if="v$.userTemp.info.tel.$error">{{v$.userTemp.info.tel.$errors[0].$message}}</p>
      </td>
    </tr> 
    <tr>
      <td class="innerCell" colspan="2">
        <span class="bold">EMAIL: </span>
        <input type="email" class="blankInput" v-model="state.userTemp.email" > 
        <p v-if="v$.userTemp.email.$error"> {{v$.userTemp.email.$errors[0].$message}}</p>
    </td>
      <td class="innerCell">
        <span class="bold"> CEP: </span>
        <input type="text" class="blankInput" v-model="state.userTemp.info.CEP" maxlength="8">
        <p v-if="v$.userTemp.info.CEP.$error">{{v$.userTemp.info.CEP.$errors[0].$message}}</p>
      </td>
    </tr>
    <tr>
      <td class="innerCell" colspan="2">
        <span class="bold"> Endereço: </span>
        <input type="text" class="blankInput" v-model="state.userTemp.info.address">
        <p v-if="v$.userTemp.info.address.$error">{{v$.userTemp.info.address.$errors[0].$message}}</p>
      </td>
    </tr>
    <tr>
      <td colspan="2"> <button class="importantBtn" @click="this.$emit('backToInfo')">Voltar</button> </td>
      <td class="innerCell"> <button class="importantBtn" @click="changeInfoConfirm()">CONFIRMAR</button> </td>
    </tr>
  </table>

</template>

<script>
import axios from 'axios'
import useValidate from '@vuelidate/core'
import {
  required,
  email,
  minLength,
  numeric,
  helpers,
  } from '@vuelidate/validators';
import {reactive, computed} from 'vue'

export default {
  name: 'ChangeUserInfo',
  data() {
    return {
      //usuario logado
      user: null
    }
  },
  emits: ['backToInfo'],
  setup() {
    const state = reactive({
      userTemp: {
        email: "",
        info: {
          name: "",
          birthday: "",
          CPF: "",
          tel: "",
          CEP: "",
          address: "",
        }
      
      },
    })

    const rules = computed(() => {
    const msgEmpty = helpers.withMessage('Campo obrigatorio', required)
    const msgNumeric = helpers.withMessage('entrada invalida! apenas números', numeric)
    const msgMin = (min) => helpers.withMessage(min +' digitos necessarios!', minLength(min) )
      return{
        userTemp: {
          email: {
            required: msgEmpty,
            email: helpers.withMessage('Insira um email valido', email)
            },
          info: {
            name: {required: msgEmpty},
            birthday: {required: msgEmpty},
            CPF: {
              required: msgEmpty,
              numeric: msgNumeric,
              minLength: msgMin(11),
              },
            tel: {
              required: msgEmpty,
              numeric: msgNumeric,

              minLength: msgMin(11),
              },
            CEP: {
              required: msgEmpty,
              numeric: msgNumeric,
              minLength: msgMin(8),
              },
            address: {required: msgEmpty},
          },
        },
      }
    })
    const v$ = useValidate(rules, state)
    return{
      state,
      v$,
    }
  },
  methods: {
    changeInfoConfirm() {

      this.v$.$validate();
      if(!this.v$.$error) {
        console.log(this.userTemp)
        axios.put('http://localhost:5000/user/info/' + this.user._id, this.state.userTemp)
        alert('Alteração feita com sucesso!')
    
      } else {
        alert('Insira os campos corretamente')
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
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("loginUser"))
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
p{
  color: red;
  margin-bottom: 0px;
  margin-top: 0px;
}
</style>