<template>
  <div :class="{'scrolled-nav': scrollPosition}" id="navbar">
    <nav>
      <section class="nav-fixed">
        <ul v-show="!mobile" id="left-list" class="nav-links">
          <LeftLinks/>          
        </ul>
        <ul v-show="!mobile" id="right-list" class="nav-links">
          <RightLinks
            :dataCart="this.dataCart"
            :dataUser="this.dataUser"
          />          
        </ul>
          <ul v-show="mobile" class="icon nav-links nav-mobile">
            <li>
              <i v-show="mobile" class="fa fa-bars"               
              @click="$emit('changeMobileNav')" 
              :class="{ 'icon-active': mobileNav}"></i>
            </li>
            <li>
              <form action="#">
                <input type="text" name="search" class="search-product">
                <button type="submit"><i class="fa fa-search"></i></button>
              </form>
            </li>
          </ul>
      </section>
      <transition name="mobileNav" class ="dropdown-nav">
        <ul v-show="mobileNav" id="left-list" class="nav-links">
          <LeftLinks/>
          <RightLinks 
            :dataCart="dataCart"
            :dataUser="dataUser"
          />          
        </ul>
      </transition>
    </nav>
  </div>
</template>

<script>
import RightLinks from './RightLinks.vue'
import LeftLinks from './LeftLinks.vue'

export default {
  name: "Navbar",
  components: {
    LeftLinks,
    RightLinks
  },
  data(){
    return{
      totalItems: 0
    }
  },
  props:{
    dataUser: Object,
    dataCart: Object,
    scrollPosition: Number,
    mobile: Boolean,
    mobileNav: Boolean,
    windowsWidth: Number,
  },  


  emits: ['changeMobileNav']

};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#navbar{
  background-color: #99D9EA;
}
li, a {
  font-family: 'Lilita One', cursive;
  text-decoration: none;
  color: #4D5656;
  padding: auto;
}

a:hover{
  color: black;
  border-color: #4D5656;
  border-bottom: 2px solid #4D5656;

}

.nav-fixed{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10%;
  transition: 0.5 ease all;
}
.nav-links li {
  padding: 0px 20px;
  display: inline-block;
}
.icon{
  list-style-type: none;
  align-items: center;
  padding: 0px 0%;
  top: 0;
  left: 24px;
}
.icon i{
  cursor: pointer;
  font-size: 24px;
}
.icon-active{
  transform: rotate(180deg);
  transition: transform 0.5s ease-in-out;
}

.dropdown-nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  max-width: 300px;
  background-color: #99D9EA;
  height: 100%;
  top: 0;
  right: 0;
}

form{
  width: 50vw;
  display: flex;
  height: 40px;
  padding: 2px;
}

.search-product{
  height: 100%;
  width: 100%;
  flex-grow: 1;
  display: flex;
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