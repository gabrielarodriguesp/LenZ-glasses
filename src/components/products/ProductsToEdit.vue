<template>
    <section id="cart-container">
        Pesquisar produto <br>
        <input type="text" class="search-product"
               placeholder="Pesquisar produto" v-model="search">
      <br>
        <span> Filtrar por categoria</span><br><br>
      <input type="radio" v-model="category" value=""> 
        Todas<br>
      <input type="radio" v-model="category" value="glasses"> 
        Óculos de Grau<br>
      <input type="radio" v-model="category" value="sunglasses"> 
        Óculos de Sol<br>
      <input type="radio" v-model="category" value="lens"> 
        Lentes de Contato<br>
    <table width="100%">
      <thead>
        <td>Remover</td>
        <td>Imagem</td>
        <td>Produto</td>
        <td>Preço Unitario</td>
        <td>Quantidade</td>
        
      </thead>
      <tbody
        v-for="(product) in filteredProducts"
        :key="product.id"
      >
        <tr>
          <td><i class="fa fa-trash" @click="removeProduct(product)"></i></td>
          <td>
            <img v-if="product.imgs" :src="`http://localhost:5000/product/image/${product.imgs[0]}`" width="300">
            
          </td>
          <td>
            <h5>{{product.name}}</h5>
          </td>
          <td>
            <h4>R$ {{product.price}}</h4>
          </td>
          <td>
            {{product.amount}}
          </td>
          <td>
            <button @click="$emit('selectedProduct', product)"> EDIT </button>
          </td>
        </tr>
      </tbody>
    </table>

    
  </section>
</template>

<script>
import ProductForm from '../products/ProductForm.vue';
import axios from 'axios';


export default {
  name: "ProductsToEdit",
  components: {
    ProductForm
  },
  props: {
    products: Array,
  },
  data() {
    return {
      search: '',
      category: '',
    }
  },
  computed: {
      // Percorre em todos os paises,
      // retorna os paises que dao 'match' com o search
      // em formato de array
      filteredProducts: function() {
          return this.products.filter((product) => {
              if(this.category == '' || product.category == this.category){
                return product.name.toLowerCase().match(this.search.toLowerCase());
              }
              return false;
              
          });
      }
  },
  methods: {
    removeProduct(product) {
      axios.delete('http://localhost:5000/product/' + product._id)
      alert('Produto removido com sucesso!')
      this.$router.go()
    }
  }
}
</script>

<style scoped>
#cart-container table thead{
  font-weight: bold;
}

#cart-container table thead td{
  background-color: #48C9B0;
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


.search-product{
  height: 30px;
  width: 50%;
  padding: 0 10px;
  font-weight: 500;
  border-radius: 5px;
}
</style>

