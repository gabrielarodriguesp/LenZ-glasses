
<template>
  <div class="principal-info">
    <h1>{{product.name}}</h1>
    <h2>R$ {{product.price}} ou 12x R${{(product.price/12).toFixed()}}</h2>
    <h3>Quantidade em estoque: {{(product.amount)}}</h3>
    <button @click="addProduct(product)" v-if="product.amount>0">
      <a>ADICIONAR AO CARRINHO</a>
    </button>
    <strong v-else>
      Produto fora de estoque
    </strong>
  </div>
</template>

<script>
export default {
  name: 'ProductInfo',
  props: ['product'],
  emits: ['addProductToCart'],

  methods: {
    addProduct(product){
      let cartItens = JSON.parse(localStorage.getItem("cartItens"))
      let sizeCart = 0;

      if(cartItens){
        sizeCart = cartItens.length;
        let newProduct = true;
      
        for(let i = 0; i < sizeCart; i++){
          if(cartItens[i]._id === product._id){
            cartItens[i].qntdCart++;
            newProduct = false;
          }
        }
      
        // Se for um item novo no carrinho
        if(newProduct){
          product.qntdCart = 1;
          cartItens[sizeCart] = product;
        }
        localStorage.setItem("cartItens", JSON.stringify(cartItens))
      
      } else {
        //carrinho vazio
        
        let cartItens = []
        product.qntdCart = 1;
        cartItens[sizeCart] = product;
        localStorage.setItem("cartItens", JSON.stringify(cartItens))
      }
      this.$router.push({
        name: 'cart'
      });
    },
  }
}
</script>

<style scoped>


.principal-info{
  align-content: right;
  background-color: #99D9EA;
  border-radius: 15px;
  float: right;
  text-align: left;
  width: 650px;
  height: 350px;
  display: grid;
  padding: 10px
}

button{
  width: 250px;
  height: 50px;
  background-color: #48C9B0;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  margin: auto;
  margin-bottom: 20px;
  font-family: 'Lilita One';
  text-decoration: none;
  color: #4D5656;
}

button:hover{
  box-shadow: 0px 5px 5px gray;
  background-color: #5bf6d7;

  cursor: pointer;
}

h1{
  text-align: center;
  margin: 30px
}

h2, h3{
  text-align: right;
  margin: 20px;
}

h1, h2, button{
  font-family: 'Lilita One';
  text-decoration: none;
  color: #4D5656;
}
strong{
  text-align: center;
  font-size: 20px;
  color:red;
}
@media (max-width: 1700px){
  .principal-info{
    width: 320px;
    height: 420px;
  }
}

@media (max-width: 1250px){
  .principal-info{
    width: 30vw;
  }
  button{
    width: 60%;
  }
}


@media (max-width: 720px){
  .principal-info{
    float:none;
    width: 90%;
    height: 300px;
    margin: auto;
    display: block;
    padding: 1vw;
  }
  .principal-info a{
    margin: auto;
  }

  button{
    display: flex;
    margin: auto;
    width: 60%;
  }
  h1{
    font-size: 5vw;
  }
  h2{
    font-size: 4vw;
  }
}
</style>