<template>
<Header :mobile="mobile"/>
<Navbar :scrollPosition="scrollPosition" 
        :mobileNav="mobileNav" 
        :windowsWidth="windowsWidth"
        :mobile="mobile"
        :dataCart="dataCart"
        :dataUser="dataUser"
        @change-mobile-nav="toggleMobileNav"

        />
</template>

<script>
import Header from './Header.vue'
import Navbar from './Navbar.vue'

export default {
    name: "Header-Navbar",
    components: {
      Header,
      Navbar
    },
    props: {
      dataCart: Object,
      dataUser: Object
    },
    data() {
      return {
        scrollPosition: 0,
        mobile: false,
        mobileNav: false,
        windowsWidth: 0,
      };
    },
    created(){
      window.addEventListener('resize', this.checkMobile);
      this.checkMobile();
    },
    methods:{
      toggleMobileNav(){
        this.mobileNav = !this.mobileNav;
      },
      checkMobile(){
        this.windowsWidth = window.innerWidth;
        if (this.windowsWidth <= 890){
          this.mobile = true;
          return;
        }
        this.mobile = false;
        this.mobileNav = false;
        return;
      }
    }
}
</script>

<style scoped>

</style>

