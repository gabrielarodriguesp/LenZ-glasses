<template>
  <div class="login-container">
    <form  v-if="!forgetPass">
      <h3>Login</h3>
      <div class="email-field">
        <label>Email: </label>
          <input type="email" class="login-form" v-model="email" placeholder="Email">
      </div>
      <div class="password-field">
        <label>Senha: </label>
        <input type="password" class="login-form" v-model="password" placeholder="Senha">
      </div>
      <div class="login-signup">
        <button class="btn btn-login" v-on:click.prevent="login()">Login</button>
        <div class="forget-pass">
          <a @click="forgetPass=true">Esqueci minha senha</a>
        </div>
        <div class="new-account">
          Novo usuario?
          <router-link to="/signup">Registre-se</router-link>
        </div>
      </div>
    </form>
    <form v-else>
      <h3>Login</h3>
      <div class="email-field">
        <label>Email: </label>
          <input type="email" class="login-form" v-model="email" placeholder="Email">
      </div>
      <button class="btn btn-login" v-on:click.prevent="recoverPass()">Login</button>
        <div class="new-account">
          Novo usuario?
          <router-link to="/signup">Registre-se</router-link>
        </div>
    </form>
  </div>
</template>

<script>

export default {
  name: "Login",
  data(){
    return{
      email: "",
      password: "",
      usersData: null,
      forgetPass: false,
    }
  },
  emits: ['LoginLogout'],
  methods: {
    async getUserdata(){
      const req = await fetch('http://localhost:5000/user');
      const data = await req.json();
      this.usersData = data;
    },
    recoverPass() {
      alert('Email para recuperação de senha enviado!')
      this.forgetPass = false;
      
    },
    login(){
      for(let i = 0; i < this.usersData.length; i++){
        if(this.email == this.usersData[i].email && this.password == this.usersData[i].password){
          let userData = this.usersData[i];
          this.$emit('LoginLogout', userData);
          return;
        }
      }
      alert('Usuario não encontrado!')
      return;
    }
  },
  mounted(){
    this.getUserdata();
  }
}

</script>

<style scoped>
.login-container{
  width: 360px;
  height: 360px;
  background-color: #48C9B0;
  border-radius: 20px;
  box-shadow: 5px 10px #888888;
  margin: 50px auto auto auto;
  padding: 20px;
}
form{
  margin-top: 30px;
  margin-bottom: 40px;
  text-align: center;
}
.login-signup{
  text-align: center;
  display: block;
}
.btn{
  cursor: pointer;
  width: 25%;
  border-color: black;
  border-radius: 5px;
  background-color: white;
}

.btn:hover{
  background-color: #99D9EA;
  font-weight: bold;
  border: 2px solid black;
}
label, input{
  font-family: 'Lilita One', cursive;
  text-decoration: none;
  font-size: 20px;
  width: 100%;
  text-align: left;
  display: block;
  margin-top: 5px;
}
input{
  margin-bottom: 20px;
  border-color: #888888;
  border-radius: 5px;
}
.forget-pass{
  margin-top:40px;
}

a {
  font-family: 'Lilita One', cursive;
  text-decoration: none;
  color: #4D5656;
  padding: auto;
}

a:hover{
  color: black;
  border-color: #4D5656;
}
</style>
