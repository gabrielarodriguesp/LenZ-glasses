<template>
  <section class='blueCard'>
    <h2 class="bold">Cadastro</h2>
     <section class="line"> </section>
    <section class='innerForm'>
       <span class="bold"> Nome </span>
      <!--  <input type="text" maxlength="128" class="blankInput" v-model="user.info.name">  -->
      
      <input type="text" placeholder="Nome" v-model="state.user.info.name">
      <p v-if="v$.user.info.name.$error"> {{v$.user.info.name.$errors[0].$message}}</p>
        <br><br>
      <span class="bold" >E-mail </span>
      <input type="email"  placeholder="Email" v-model="state.user.email" >
      <p v-if="v$.user.email.$error"> {{v$.user.email.$errors[0].$message}}</p>
        <br><br>
      <span class="bold"> Data de Nascimento </span> 
      <input type="date" placeholder="Data de nascimento" v-model="state.user.info.birthday" > 
      <p v-if="v$.user.info.birthday.$error"> {{v$.user.info.birthday.$errors[0].$message}}</p>
        <br><br>
      <span class="bold"> CPF </span>
      <input type="text" placeholder="CPF" v-model="state.user.info.CPF" maxlength="11"> 
      <p v-if="v$.user.info.CPF.$error"> {{v$.user.info.CPF.$errors[0].$message}}</p>
        <br><br>
      <span class="bold"> Telefone </span>
      <input type="tel" placeholder="Telefone" v-model="state.user.info.tel" maxlength="11"> 
      <p v-if="v$.user.info.tel.$error">{{v$.user.info.tel.$errors[0].$message}}</p>
        <br><br>
      <span class="bold"> CEP </span>
      <input type="text" placeholder="CEP" v-model="state.user.info.CEP" maxlength="8"> 
      <p v-if="v$.user.info.CEP.$error">{{v$.user.info.CEP.$errors[0].$message}}</p>
        <br><br>
      <span class="bold"> Endereço </span>
      <input type="text" placeholder="Endereço" v-model="state.user.info.address"> 
      <p v-if="v$.user.info.address.$error">{{v$.user.info.address.$errors[0].$message}}</p>
        <br><br>       
      <span class="bold"> Senha </span>
      <input type="password" placeholder="Senha" v-model="state.user.password"> 
      <p v-if="v$.user.password.$error">{{v$.user.password.$errors[0].$message}}</p>
        <br><br>
      <span class="bold"> Repita a Senha </span>
      <input type="password" placeholder="Repita a senha" v-model="state.confirmPass"> 
      <p v-if="v$.confirmPass.$error">{{v$.confirmPass.$errors[0].$message}}</p>
        <br><br>
    </section>
     <button class="importantBtn" @click="submit()">CRIAR CONTA</button>
    <!--  <button class="importantBtn" @click="confirm()">CRIAR CONTA</button> -->
  </section>
</template>

<script>
import axios from 'axios';
import useValidate from '@vuelidate/core'
import {
  required,
  email,
  minLength,
  sameAs,
  numeric,
  helpers,
  } from '@vuelidate/validators';
import {reactive, computed} from 'vue'

export default {
  name: 'signup',
  emits: ['LoginLogout'],
  data(){
    return{      
    }
  },
  
  setup() {
    const state = reactive({
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
      confirmPass: "",
    })

    const rules = computed(() => {
      const msgEmpty = helpers.withMessage('Campo obrigatorio', required)
      const msgNumeric = helpers.withMessage('entrada invalida! apenas números', numeric)
      const msgSamePass = helpers.withMessage('Senhas devem ser iguais', sameAs(state.user.password));
      const msgMin = (min) => helpers.withMessage(min +' digitos necessarios!', minLength(min) )
      return{
        user: {
          email: {
            required: msgEmpty,
            email: helpers.withMessage('Insira um email valido', email)
            },
          password: {
            required: msgEmpty
          },
          buys: [],
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
        confirmPass: {
          required: msgEmpty, 
          sameAs: msgSamePass
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
    submit() {
      this.v$.$validate();
      if(!this.v$.$error) {
        axios.post('http://localhost:5000/user', (this.state.user))
        alert("Conta criada com sucesso!")
        this.$router.push('/login')
      } else {
        alert("Preencha os campos corretamente!")
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
input{
    height: 24px;
  border-radius: 5px;
  background-color: white;
  border: none;
  box-shadow: inset 1px 1px 3px 0px black;
  padding: 5px;
  width: 100%;
}
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
span{
  font-weight: bold;
}
h2{
  font-family: Georama, Verdana, sans-serif;
  font-size: 32px;
  font-weight: 400;
}

p{
  color: red;
  margin-bottom: -20px;
  margin-top: 0px;
}
</style>