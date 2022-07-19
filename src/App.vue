<template>
  <div class="main">
    <header>
      <HeaderNavbar
        :dataCart="dataCart"
        :dataUser="dataUser"
      />
    </header>
    <div id="body">
      <router-view 
        @login-logout="LoginLogout"
      />
    </div>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import HeaderNavbar from './components/template/HeaderNavbar.vue';
import Footer from './components/template/Footer.vue';

export default {
  components: {
    HeaderNavbar,
    Footer,
  },
  data(){
    return {
      dataCart: [],
      dataUser: null
    }
  },
  methods: {
    
    // Se a nova quantidade for 0, exclui o item
    // Funcao chamada na pagina 'carrinho'
    changeQntdCart(indexProduct, newQntd){
      if(newQntd == 0){
        this.dataCart.splice(indexProduct, 1);
      }else{
        this.dataCart[indexProduct].qntdCart = newQntd;
      }
      localStorage.setItem("cartItens", JSON.stringify(this.dataCart))

    },

    // Caso seja login, user ira conter um JSON com dados do usuario
    // cao seja logout, user = nulo
    LoginLogout(user) {
      if(user)
        localStorage.setItem("loginUser", JSON.stringify(user))
      else
        localStorage.removeItem("loginUser")
      
      this.dataUser = user;

      // Quando logar ou deslogar, vai para pagina inicial
      this.$router.push('/')
    }
  },
  created() {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"))
      if(loginUser){
        this.dataUser = loginUser;
      }
    const cartItens = JSON.parse(localStorage.getItem("cartItens"))
    if(cartItens){
      this.dataCart = cartItens;
    }
  }
}
</script>

<style>

body {
  margin:0;
  padding:0;
  height:100%;
}
.main{
  position: relative;
  min-height: 100vh;
}
#body{
  padding-bottom: 400px;
}
footer{
  position: absolute;
  bottom: 0;
  height: 200px;
  width: 100%;
}
</style>