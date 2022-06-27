<template>
  <div class="description-product">
    <h1>Descrição do produto</h1>
    <p 
    v-for="(attr, descr, index) in product.description"
    :key="index"> 
    <b>{{descr}}:</b> {{attr}}</p>
  </div>
</template>

<script>
export default {
  name: 'ProductDescription',
  props: ['product']
}
</script>

<style scoped>
.description-product{
  border: 2px solid #99D9EA;
  background-color: #bfebf5;
  margin-top: 20px;
  width: auto;
  height: auto;
  border-radius: 15px;
  padding: 10px 20px;
}

h1{
  font-size: 40px;
  text-align: center;
  font-family: 'Lilita One';
  color: #4D5656;
}

@media (max-width: 720px){
  .description-product{
    float:none;
    width: 90%;
    margin: 20px auto;
    display: block;
  }
  h1{
    font-size: 5vw;
  }
  p{
    font-size: 3vw;
  }
}

</style>