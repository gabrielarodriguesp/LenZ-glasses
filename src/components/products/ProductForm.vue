<template>
  <table class="blueCard">
    <tr>
      <td colspan="2">
        <span> Nome do Produto </span>
        <br><input type="text" v-model="state.product.name"> <br><br>
      </td>
    </tr>
    <tr>
      <td>
        <span> Preço do Produto </span>
        <br><input type="text" v-model="state.product.price" @keypress="isNumber($event)">
      </td>
      <td>
        <span> Quantidade em estoque</span>
        <br><input type="text" v-model="state.product.amount"><br>
      </td>
    </tr>
    <tr>
      <td>
        <span> Tipo do Produto </span><br><br>
        <input type="radio" v-model="state.product.category" value="glasses"> 
          Óculos de Grau<br>
        <input type="radio" v-model="state.product.category" value="sunglasses"> 
          Óculos de Sol<br>
        <input type="radio" v-model="state.product.category" value="lens"> 
          Lentes de Contato<br>
      </td>
      <td>
        <span> Garantia (meses)</span>
        <br><input type="text" v-model="state.product.warranty"><br>
      </td>
      
    </tr>
    <h1>DESCRIÇÃO DO PRODUTO</h1>

    <section v-if="state.product.category!='lens'">
      <tr>
        <td colspan="2">
          <span> Material da lente </span>
          <br><input type="text"
              v-model="state.descriptionGlasses['Material da lente']"> <br><br>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span> Material da armação </span>
          <br><input type="text" v-model="state.descriptionGlasses['Material da armação']"> <br><br>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <span> Proteção da lente </span>
          <br><input type="text" v-model="state.descriptionGlasses['Proteção da lente']"> <br><br>
        </td>
      </tr>
      <tr>
        <td>
          <span> Cor da lente </span>
          <br><input type="text" v-model="state.descriptionGlasses['Cor da lente']"> <br><br>
        </td>
        <td>
          <span> Cor da armação </span>
          <br><input type="text" v-model="state.descriptionGlasses['Cor da Armação']"> <br><br>
        </td>
      </tr>

      <td rowspan="2" v-if="state.product.category!='lens'">
        <span> Tamanho do Produto </span><br><br>
        Lente (cm):
        <input type="text" 
            v-model="state.descriptionGlasses['Tamanho da lente (cm)']" 
            @keypress="isNumber($event)"> <br><br>
        Ponte (cm): 
        <input type="text" 
            v-model="state.descriptionGlasses['Tamanho da ponte (cm)']" 
            @keypress="isNumber($event)"> <br><br>
        Haste (cm): 
        <input type="text" 
          v-model="state.descriptionGlasses['Tamanho da haste (cm)']" 
          @keypress="isNumber($event)"> <br>
      </td>
    </section>

    <section v-if="state.product.category=='lens'">
      <tr>
        <td>
          <span> Tempo de substituiçao </span>
          <br><input type="text" v-model="state.descriptionLens['Tempo de substituição']"> <br><br>
        </td>
        <td>
          <span> Material </span>
          <br><input type="text" v-model="state.descriptionLens['Material']"> <br><br>
        </td>
        <td>
          <span> Diametro </span>
          <br><input type="text" v-model="state.descriptionLens['Diametro']"> <br><br>
        </td>
        <td>
          <span> Pares por pacote </span>
          <br><input type="text" v-model="state.descriptionLens['Pares por pacote']"> <br><br>
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
import useValidate from '@vuelidate/core'
import {
  required,
  minLength,
  numeric,
  helpers,
  requiredIf,
  } from '@vuelidate/validators';
import {reactive, computed} from 'vue'

export default{
  name: "ProductForm",
  props: {
    newProduct: Boolean,
  },

  setup(props) {
    const state = reactive({
      isNewProduct: null,
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
    
    })
    const rules = computed(() => {
    console.log('props' + this.newProduct)

    const msgEmpty = helpers.withMessage('Campo obrigatorio', required)
    const msgEmptyIf = helpers.withMessage('Campo obrigatorio', required)
    const msgNumeric = helpers.withMessage('entrada invalida! apenas números', numeric)
    const msgMin = (min) => helpers.withMessage(min +' digitos necessarios!', minLength(min))
      return{
        product: {
          name: {
            required: requiredIf(function(newProduct){
        	    return newProduct
            })
          },
          price: {required: msgEmpty},
          warranty: {
            required: msgEmpty,
            numeric: msgNumeric,
            minLength: msgMin(11),
            },
          amount: {
            required: msgEmpty,
            numeric: msgNumeric,

            minLength: msgMin(11),
            },
          category: {
            required: msgEmpty,
            numeric: msgNumeric,
            minLength: msgMin(8),
            },
          description: {required: msgEmpty},
          imgs: {required: msgEmpty},
        }
      }
    })
    const v$ = useValidate(rules, state)
    return{
      state,
      v$,
    }
  },
  methods: {
    uploadFile() {
      state.product.images = this.$refs.file.files;
    },
    submitProduct() {
      if(this.product.category=="lens"){
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
  },
  mounted() {
    // state.isNewProduct = newProduct
    console.log(this.state.isNewProduct)
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
