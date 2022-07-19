<template>
  <div class="options">
    <li>
      <ul>
        <a @click="info()">Informações</a>
      </ul >
      <ul><a @click="editProduct()">Editar produtos</a></ul>
      <ul><a @click="addProduct()">Adicionar produtos</a></ul>
      <ul><a @click="editUser()">Editar usuarios</a></ul>
      <ul><a @click="logout()">Sair da conta</a></ul>
    </li>
  </div>
  <div class="display">
    <section v-if="this.optionSelect=='info'">
      <UserInfo/>
    </section>
    <section v-else-if="this.optionSelect=='editProduct'">
      <AdminEditProduct />
    </section>
    <section v-else-if="this.optionSelect=='addProduct'">
      <AdminAddProduct />
    </section>
    <section v-else-if="this.optionSelect=='AdminEditUser'">
      <AdminEditUser />
    </section>
  </div>
</template>

<script>
import UserInfo from '../components/profile/UserInfo.vue'
import AdminEditProduct from '../components/profile/admin/AdminEditProduct.vue'
import AdminAddProduct from '../components/profile/admin/AdminAddProduct.vue'
import AdminEditUser from '../components/profile/admin/AdminEditUser.vue'

export default {
  name: "admin",
  components: {
    UserInfo,
    AdminEditProduct,
    AdminAddProduct,
    AdminEditUser,
  },
  emits: ['LoginLogout'],
  data() {
    return {
      optionSelect: "info"
    }
  },
  methods: {
    info(){
      this.optionSelect = "info";
    },
    editProduct(){
      this.optionSelect = "editProduct"
    },
    addProduct(){
      this.optionSelect = "addProduct"
    },
    editUser(){
      this.optionSelect = "AdminEditUser"
    },
    logout(){
      this.$emit('LoginLogout', null);
    }
  },
  mounted() {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"))
      if(!loginUser || !loginUser.admin){
        this.$router.push('/');
      }
  }

  
}
</script>

<style scoped>
li{
  list-style: none;
  margin: 50px;
}
li, a {
  font-family: 'Lilita One', cursive;
  text-decoration: none;
  color: #4D5656;
  padding: auto;
  cursor: pointer;
}

a:hover{
  color: black;
  border-color: #4D5656;
  border-bottom: 2px solid #4D5656;

}
.options{
  float: left;
}
.display{
  margin: 40px;
  display: inline-block;
}
</style>


