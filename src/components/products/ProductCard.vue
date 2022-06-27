<template>
  <div class="card">
    <div class="card-img">
          <router-link :to="{
            name: 'product',
            params: { currProduct: JSON.stringify(product ) },
          }">
        <img :src="require(`../../assets/products/img/${product.src[0]}`)">
      </router-link>
    </div>
    <div class="title">
      <h2>{{product.name}}</h2>
    </div>
    <div class="price">
      <h2>R$ {{product.price}}</h2>
    </div>

    <div>
      <button class="buy-btn" @click="$emit('AddProduct')" >
        Comprar
      </button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'product',
  props: ['product'],
  emits: ['AddProduct']
}
</script>

<style scoped>
*{
  box-sizing: border-box;
  margin: 0;
}
.card{
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  box-shadow: 0px 10px 5px gray;
}
.title{
  font-size: 20px;
  font-weight: bold;
}
.price{
  margin: 10px;
  color: grey;
  font-size: 22px;
}
.card-img img{
  width: 220px;
  height: 220px;
}
.buy-btn{
  width: 40%;
  background-color: #99D9EA;
  border: none;
  padding: 1em;
  font-weight: bold;
  border-radius: 5px;
}
.buy-btn:hover{
  box-shadow: 0px 5px 5px gray;
  background-color: #48C9B0;
  cursor: pointer;
}
</style>