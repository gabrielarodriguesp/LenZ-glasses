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
        @add-product-to-cart="addProductToCart"
        @login-logout="LoginLogout"
        @change-qntd-cart="changeQntdCart"
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
    goToCart(){
      this.$router.push({
        name: 'cart',
        params: { dataToCart: JSON.stringify( this.dataCart ) },
    });
    },

    // Funcao chamada na pagina de produtos
    addProductToCart(data){
      let sizeCart = this.dataCart.length;

      let newProduct = true;
      for(let i = 0; i < sizeCart; i++){
        if(this.dataCart[i].code === data.code){
          this.dataCart[i].qntdCart++;
          newProduct = false;
        }
      }
      
      // Se for um item novo no carrinho
      if(newProduct){
        data.qntdCart = 1;
        this.dataCart[sizeCart] = data;
      }
      //alert('item adicionado ao carrinho')
      localStorage.setItem("cartItens", JSON.stringify(this.dataCart))

      this.goToCart();
    },

    
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
*{
}

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