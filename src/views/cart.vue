<template>
  <section id="cart-container">
    <table width="100%">
      <thead>
        <td>Remover</td>
        <td>Imagem</td>
        <td>Produto</td>
        <td>Preço Unitario</td>
        <td>Quantidade</td>
        <td>Subtotal</td>
      </thead>
      <tbody
      v-for="(product, index) in productsOnCart"
      :key="product.id"
      >
        <tr v-show="product.qntdCart > 0">
          <!-- <td><i class="fa fa-trash" @click="$emit('AddCart', )"></i></td> -->
          <td><i class="fa fa-trash" @click="delProduct(productsOnCart, index)"></i></td>
          <td>
            <img class="product-img" 
            :src="require(`../assets/products/img/${product.src[0]}`)"></td>
          <td>
            <h5>{{product.name}}</h5>
          </td>
          <td>
            <h4>R$ {{product.price}}</h4>
          </td>
          <td>
            <input type="number" 
            v-model="product.qntdCart" 
            v-on:change="AddItensCart(product.qntdCart, index)"
            name="qntd" id="qtndInput"

            min="1">
          </td>
          <td>
            <h4>R$ {{product.qntdCart * product.price}}</h4>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>TOTAL</td>
        <td>R$ {{calcTotal(this.productsOnCart)}}</td>
      </tfoot>
    </table>
    <button class="btn continue-buy">
      <router-link to="/">
        CONTINUAR COMPRANDO
      </router-link>
    </button>
    <button class="btn ckeckout-button" @click="checkLogin()">
        FINALIZAR COMPRA

      <router-link to="/payment">
      </router-link>
    </button>
    
  </section>

</template>
<script>

export default {
  name: "cart",
  data() {
    return{
      productsOnCart: null
    }
  },
  props: ['dataToCart'],
  emits: ['addProductToCart', 'LoginLogout', 'changeQntdCart'],
  mounted() {

    const cartItens = JSON.parse(localStorage.getItem("cartItens"))
    if(cartItens){
      this.productsOnCart = cartItens;
    }
    // console.log(this.dataToCart)
    if(this.dataToCart)
      this.productsOnCart = JSON.parse(this.dataToCart)
  },
  methods: {
    delProduct(productsOnCart, index){
      productsOnCart.splice(index, 1);
      // Muda quantidade do carrinho para 0
      this.$emit('changeQntdCart', index, 0)
    },
    calcTotal(products){
      let sum = 0;
        if(products){
          for(let i = 0; i < products.length; i++){
            sum += (products[i].qntdCart * products[i].price)
          }
        }
      return sum;
      
      },
    AddItensCart(newQntdCart, index){
      this.$emit('changeQntdCart', index, newQntdCart)
    },
    checkLogin(){
      this.infoUser = JSON.parse(localStorage.getItem("loginUser"))
      // console.log(this.infoUser)
      if(this.infoUser){
        this.$router.push('payment');
      }
      else{
        alert('É necessario fazer login')
        this.$router.push('login');

      }
    }
  }
}
</script>

<style scoped>
#cart-container{
  margin: 100px 5%;
}
#cart-container table{
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

#cart-container table thead{
  font-weight: bold;
}

#cart-container table thead td{
  background-color: #48C9B0;
  color: #fff;
  border: none;
  padding: 6px 0;
}

#cart-container table td{
  border: 1px solid;
  text-align: center;
}
td:first-child { 
  width: 80px  
}
.product-img{
  width: 150px;
  height: 150px;
}

#qtndInput{
  width: 50px;
}

.btn{
  width: 250px;
  height: 45px;
  background-color: #48C9B0;
  border-radius: 15px;
  text-align: center;
  line-height: 40px;
  margin: 30px;
  display: block;
}

.btn:hover{
  box-shadow: 0px 5px 5px gray;
  background-color: #99D9EA;
  cursor: pointer;
}
.continue-buy{
  float: left;
}
.ckeckout-button {
  float: right;
}

li, a {
  font-family: 'Lilita One', cursive;
  text-decoration: none;
  color: #4D5656;
}

a:hover{
  color: black;
  border-color: #4D5656;
  border-bottom: 2px solid #4D5656;
}
td{
  border: 1px solid;
}
@media (max-width: 750px){
  .btn {
    float: left;
    margin: 20px auto;
    text-align: center;
  }

}
</style>
