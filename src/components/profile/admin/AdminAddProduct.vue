<template>
  <div class="admin-add-product">
  <!-- Adicionar Produto -->
  <table class="blueCard">
    <tr>
      <td colspan="2">
        <span class="bold"> Nome do Produto </span>
        <br><input type="text" maxlength="128" class="blankInput" v-model="tempProductName"> <br><br>
      </td>
      <td>
        <span class="bold"> Preço do Produto </span>
        <br><input type="text" class="blankInput" v-model="tempProductPrice" @keypress="isNumber($event)">
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <span class="bold">Descrição </span>
        <br><input type="text" maxlength="128" class="blankInput" v-model="tempProductDescription">  
      </td>
    </tr>
    <tr>
      <td>
        <span class="bold"> Tipo do Produto </span>  <br>
        <br><input type="radio" v-model="tempProductType" value="grau"> Óculos de Grau  
        <br><input type="radio" v-model="tempProductType" value="sol"> Óculos de Sol  
        <br><input type="radio" v-model="tempProductType" value="lentes"> Lentes de Contato  
      </td>
      <td>
        <span class="bold"> Código do Produto </span>
        <br><input type="text" class="blankInput" v-model="tempProductCode"><br>
        <br> <button class="importantBtn" @click="randomCode()"> Gerar Código </button>
      </td>
      <td rowspan="2" v-if="tempProductType!='lentes'">
        <span class="bold"> Tamanho do Produto </span>  <br>
        <br>Lente: <input type="text" class="blankInput" v-model="tempSize0" @keypress="isNumber($event)"> <br>
        <br>Ponte: <input type="text" class="blankInput" v-model="tempSize1" @keypress="isNumber($event)"> <br>
        <br>Haste: <input type="text" class="blankInput" v-model="tempSize2" @keypress="isNumber($event)"> <br>
      </td>
    </tr>

  </table>
  </div>  
</template>

<script>
export default {
  name: "AdminAddProduct",
  data() {
    return {
      tempClientName: "",
      tempClientDateBirth: "",
      tempClientCPF: "",
      tempClientTelephone: "",
      tempClientCEP: "",
      tempClientAddress: "",
      tempClientEmail: "",
      tempPassword0: "",
      tempPassword1: "",
      
      tempImgPath: 'glasses.png',
      tempProductName: "",
      tempProductType: "",
      tempProductPrice: 0.00,
      tempSize: "",
      tempSize0: "",
      tempSize1: "",
      tempSize2: "",
      tempProductDescription: "",
      tempProductCode: "",
    }
  },
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },
    randomCode() {
      let code = [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      this.tempProductCode = code.toUpperCase()
    },
    
  }
}
</script>

<style scoped>
.blankInput{
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
.bold{
  font-weight: bold;
}
td{
  vertical-align: top;
}
.importantBtn{
  background-color: #3649F5;
  border: none; 
  border-radius: 20px;
  text-align: center;
  width: 100px;
  height: 35px;
  color: white;
  font-weight: bold;
  margin-left: 25px;
  font-family: Georama, Verdana, sans-serif;
  cursor: pointer;
}
</style>