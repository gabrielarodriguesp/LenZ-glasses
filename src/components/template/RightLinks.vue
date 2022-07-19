<template>
  <li>
    <i class="fa fa-shopping-cart"></i>
    <span class="total-quantity">{{numberItens()}}</span>
    <router-link to="/cart"
      @change-qntd-cart=changeQntdCart()
    >Carrinho</router-link>
  </li>

  <li v-if="!this.dataUser">
    <router-link to="/login" 
    >Login</router-link>
  </li>
  <li v-else-if="!this.dataUser.admin">
    <router-link to="/client">Perfil (cliente)</router-link>
  </li>
  <li v-else>
    <router-link to="/admin">Perfil(admin)</router-link>
  </li>
</template>

<script>
export default {
  name: 'RightLinks',
  props: {
    dataUser: Object,
    dataCart: Object,
  },
  data() {
    return {
      qntdOnCart: 0,
    }
  },
    methods: {
      // Quantidade de produtos no carrinho
      // Que sera mostrado ao lado do icone do carrinho
      numberItens(){
        let sum = 0;
        const cartItens = JSON.parse(localStorage.getItem("cartItens"))
        if(cartItens){
          for(let i = 0; i < cartItens.length; i++){
            sum += cartItens[i].qntdCart;
          }
        }
        
        return sum;
      }
  },
}
</script>

<style scoped>

li, a {
  font-family: 'Lilita One', cursive;
  text-decoration: none;
  color: #4D5656;
  padding: auto;
}

a:hover{
  color: black;
  border-color: #4D5656;
  border-bottom: 2px solid #4D5656;
}

.nav-links li {
  display: inline-block;
  padding: 0px 20px;
}

.total-quantity {
  align-items: center;
  background: #48C9B0;
  color: black;
  border-radius: 50%;
  display: flex;
  font-weight: bold;
  height: 30px;
  width: 30px;
  justify-content: center;
  position: absolute;
}

@media (max-width: 890px){
  .dropdown-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    max-width: 250px;
    background-color: #99D9EA;
    height: 100%;
    top: 0;
    right: 0;
  }
  .dropdown-nav li{
    margin-right: 0;
    padding: 10px;
  }
  .total-quantity{
    display: none;
  }

}
</style>