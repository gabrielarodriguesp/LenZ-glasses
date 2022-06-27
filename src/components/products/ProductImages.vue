<template>
  <section class="container-imgs">
    <div class="big-img">
      
      <img v-if="this.mainImage" class="img-main" :src="require(`../../assets/products/img/${this.mainImage}`)">
      <img v-else class="img-main" :src="require(`../../assets/products/img/${this.product.src[0]}`)">
    </div>
    <div class="small-img">
      <img class="others-img"
      v-for="(img, index) in product.src"
      :key="index"
      :src="require(`../../assets/products/img/${img}`)"
      @click="changeMainImage(img)"
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
      mainImage: null
    }
  },
  methods: {

    changeMainImage(img){
      this.mainImage = img;
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