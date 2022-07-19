<template>
  <section class="container-imgs" v-if="product.imgs">
    <div class="big-img">      
      <img class="img-main" :src="`http://localhost:5000/product/image/${product.imgs[mainImage]}`">
    </div>
    <div class="small-img">
      <img class="others-img"
      v-for="(img, index) in product.imgs"
      :key="index"
      :src="`http://localhost:5000/product/image/${img}`"
      @click="changeMainImage(index)"
      >
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductImages',
  props: ['product'],
  data() {
    return {
      mainImage: 0
    }
  },
  methods: {
    changeMainImage(index){
      this.mainImage = index;
    }
  }
}
</script>

<style scoped>
.container-imgs{
  display: inline-block;
}
.big-img{
  width: 550px;
  height: 500px;
  background: white;
  border-radius: 15px;
  display: inline-block;
}
.small-img{
  display: flex;
  justify-content: space-between;
  width: 550px;
  margin-top: 10px;
  cursor: pointer;
}
.img-main{
  width: 550px;
  height: 500px;
}
.others-img{
  width: 100px;
  background: white;
  border-radius: 10px;
}
@media (max-width: 1250px){
.big-img{
  width: 40vw;
  margin: auto;
}
.img-main{
  width: 100%;
  height: 100%;
}
.others-img{
  width: 8vw;
}

.small-img{
  width: 40vw;
  margin: 10px auto 40px;
}
}

@media (max-width: 720px){
.container-imgs{
  display: block;

}
.big-img{
  display: block;
  margin: auto;
  width: 80%;
  height: 100vw;

}
.img-main{
  width: 100%;
  height: 100%;
}
.others-img{
  width: 16%;
}

.small-img{
  width: 80%;
  margin: 10px auto 40px;
}
}
</style>