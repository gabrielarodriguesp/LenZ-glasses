<template>
  <div id="header">
    <router-link to="/">
      <h1>LenZ Glasses</h1>
    </router-link>
      <div v-show="!mobile" class="search-container">
        <form action="#">
          <input type="text" v-model="productName"  class="search-product">
            <button type="submit">
              <router-link :to="`/search/${productName}`" >

              <i class="fa fa-search"></i>
              </router-link>

            </button>
        </form>
      </div>
      
  </div>
</template>

<script>
export default {
    name: "Header",
    props: {
      mobile: Boolean,
    },
    data(){
      return{
        productName: null,
      }
    },
    methods: {
      searchProduct(){
        this.$router.push({
          name: 'search/ui'
        });
      }
    }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
a{
  color: black;
}
#header{
  background-color: #48C9B0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 200%;
  height: 150px;
  padding: 0 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

#header h1{
  margin: auto;
  font-family: 'Lobster', cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 60px;
  color: #E5E8E8;
  display:inline-block;
}


form{
  display: flex;
  height: 40px;
  padding: 2px;
}

form .search-product{
  height: 100%;
  width: 100%;
  padding: 0 10px;
  font-weight: 500;
  border: none;

  border-radius: 10px 0 0 10px;
}

form button{
  padding: 0 15px;
  border: none;
  cursor: pointer;
  border-radius: 0 10px 10px 0;

}
</style>