<template>
  <table class="blueCard">
    <tr>
      <td colspan="2">
        <span> Nome do Produto </span>
        <br><input type="text" v-model="product.name">
      </td>
    </tr>
    <tr>
      <td>
        <span> Preço do Produto </span>
        <br><input type="text" v-model="product.price" @keypress="isNumber($event)">
      </td>
      <td>
        <span> Quantidade em estoque</span>
        <br><input type="text" v-model="product.amount"><br>
      </td>
    </tr>
    <tr>

      <td>
        <span> Garantia (meses)</span>
        <br><input type="text" v-model="product.warranty"><br>
      </td>
      
    </tr>
    <h1>DESCRIÇÃO DO PRODUTO</h1> <br>
    <tr>
      <td>
        <span> Tipo do Produto </span><br><br>
        <input type="radio" v-model="product.category" value="glasses"> 
          Óculos de Grau<br>
        <input type="radio" v-model="product.category" value="sunglasses"> 
          Óculos de Sol<br>
        <input type="radio" v-model="product.category" value="lens"> 
          Lentes de Contato<br>
      </td>
    </tr>
    
    <section v-if="product.category!='lens'">
      <tr>
        <td colspan="2">
          <span> Material da lente </span>
          <br><input type="text"
              v-model="descriptionGlasses['Material da lente']"> <br><br>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span> Material da armação </span>
          <br><input type="text" v-model="descriptionGlasses['Material da armação']"> <br><br>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span> Proteção da lente </span>
          <br><input type="text" v-model="descriptionGlasses['Proteção da lente']"> <br><br>
        </td>
      </tr>
      <tr>
        <td>
          <span> Cor da lente </span>
          <br><input type="text" v-model="descriptionGlasses['Cor da lente']"> <br><br>
        </td>
        <td>
          <span> Cor da armação </span>
          <br><input type="text" v-model="descriptionGlasses['Cor da Armação']"> <br><br>
        </td>
      </tr>

      <td rowspan="2" v-if="product.category!='lens'">
        <span> Tamanho do Produto </span><br><br>
        Lente (cm): 
        <input type="text" 
            v-model="descriptionGlasses['Tamanho da lente (cm)']" 
            @keypress="isNumber($event)"> <br><br>
        Ponte (cm): 
        <input type="text" 
            v-model="descriptionGlasses['Tamanho da ponte (cm)']" 
            @keypress="isNumber($event)"> <br><br>
        Haste (cm): 
        <input type="text" 
          v-model="descriptionGlasses['Tamanho da haste (cm)']" 
          @keypress="isNumber($event)"> <br>
      </td>
    </section>

    <section v-if="product.category=='lens'">
      <tr>
        <td>
          <span> Tempo de substituiçao </span>
          <br><input type="text" v-model="descriptionLens['Tempo de substituição']"> <br><br>
        </td>
        <td>
          <span> Material </span>
          <br><input type="text" v-model="descriptionLens['Material']"> <br><br>
        </td>
        <td>
          <span> Diametro </span>
          <br><input type="text" v-model="descriptionLens['Diametro']"> <br><br>
        </td>
        <td>
          <span> Pares por pacote </span>
          <br><input type="text" v-model="descriptionLens['Pares por pacote']"> <br><br>
        </td>
      </tr>
      <br>
      <br>
    </section>
      <tfoot>
        <span> Imagens do produto </span> <br>
        <input type="file" @change="uploadFile" ref="file" multiple="True">
        <td></td>
        <td><button @click="submitProduct">Enviar</button></td>
      </tfoot>

  </table>
</template>

<script>
export default{
  name: "ProductForm",
  data () {
    return {
      // produto é comum para todos
      product: {
        name: null,
        price: null,
        warranty: null,
        amount: null,
        category: null,
        description: null,
        imgs: null,
      },
      //Apenas para oculos
      descriptionGlasses: {},
      
      //Apenas para lentes
      descriptionLens: {},
    
    }
      
  },
  methods: {
    uploadFile() {
      this.product.images = this.$refs.file.files;
    },
    submitProduct() {
      if(!this.product.category){
        this.product.description = null
      } else if(this.product.category=="lens"){
        this.product.description = this.descriptionLens;
      } else {
        this.product.description = this.descriptionGlasses;
      }
      this.$emit('productInfo', this.product);
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
input[type=text]{
  height: 24px;
  border-radius: 5px;
  background-color: white;
  border: none;
  box-shadow: inset 1px 1px 3px 0px black;
  padding: 5px;
  width: 70%;
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
span{
  font-weight: bold;
}
td{
  vertical-align: top;
}
button{
  background-color: #48C9B0;
  border-radius: 20px;
  text-align: center;
  width: 100px;
  height: 35px;
  font-weight: bold;
  font-family: Georama, Verdana, sans-serif;
  cursor: pointer;
  float: right;
}
button:hover{
  box-shadow: 0px 5px 5px gray;
  background-color: #5bf6d7;
  cursor: pointer;
}
</style>