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
          <td><i class="fa fa-trash" @click="changeQntdCart(0, index)"></i></td>
          <td>
            <img class="product-img" 
            :src="`http://localhost:5000/product/image/${product.imgs[0]}`"></td>
          <td>
            <h5>{{product.name}}</h5>
          </td>
          <td>
            <h4>R$ {{product.price}}</h4>
          </td>
          <td>
            <input type="number" 
              v-model="product.qntdCart" 
              v-on:change="changeQntdCart(product.qntdCart, index)"
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
      <router-link to="/">
        <button class="btn continue-buy">
          <p>CONTINUAR COMPRANDO</p>
        </button>
      </router-link>

        <button class="btn ckeckout-button" @click="checkLogin()">
          <p>FINALIZAR COMPRA</p>
        </button>
    
  </section>

</template>
<script>

export default {
  name: "cart",
  data() {
    return{
      productsOnCart: []
    }
  },
  emits: ['LoginLogout', 'changeQntdCart'],
  mounted() {

    const cartItens = JSON.parse(localStorage.getItem("cartItens"))
    if(cartItens){
      for(let i = 0; i < cartItens.length; i++){
        if(cartItens[i].amount>0)
          this.productsOnCart.push(cartItens[i]);
      }
      localStorage.setItem("cartItens", JSON.stringify(this.productsOnCart))

    }
  },
  methods: {
    
    // Altera a quantidade de um produto que esta no carrinho
    changeQntdCart(newQntd, indexProduct){
      const cartItens = JSON.parse(localStorage.getItem("cartItens"))

      // Quantidade maior que o estoque
      if(cartItens[indexProduct].amount < newQntd){
        alert('Quantidade de itens maior que o estoque')
        cartItens[indexProduct].qntdCart = cartItens[indexProduct].amount;
      }
      // Remover item do carrinho
      else if (newQntd == 0){
        cartItens.splice(indexProduct, 1);
      } else {
        cartItens[indexProduct].qntdCart = newQntd;
      } 
      
      localStorage.setItem("cartItens", JSON.stringify(cartItens))
      this.$router.go()
    },

    delProduct(productsOnCart, index){
      productsOnCart.splice(index, 1);
      // Muda quantidade do carrinho para 0
      this.changeQntdCart(index, 0)
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
      console.log(this.infoUser)
      if(!this.infoUser){
        alert('É necessario fazer login')
        this.$router.push('login');
      }
      else if (this.infoUser.admin){
        alert('Admin não pode fazer compras!')
        return; 
      } else {
        this.$router.push('payment');
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
  line-height: 50%;
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

li, p {
  padding: 0px;
  
  font-family: 'Lilita One', cursive;
  text-decoration: none;
  color: #4D5656;
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
