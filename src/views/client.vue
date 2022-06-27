<template>
  <div class="options">
    <li>
      <ul>
        <a @click="info()">Informações</a>
      </ul >
      <ul><a @click="historic()">Historico de compra</a></ul>
      <ul><a @click="agend()">Agendamento de exames</a></ul>
      <ul><a @click="logout()">Sair da conta</a></ul>
    </li>
  </div>
  <div class="display">
    <section v-if="this.optionSelect=='info'">
      <UserInfo/>
    </section>
    <section v-else-if="this.optionSelect=='historic'">
      <ClientHistoric />
    </section>
    <section v-else-if="this.optionSelect=='agend'">
      <ClientAgend />
    </section>
  </div>
</template>

<script>
import UserInfo from '../components/profile/UserInfo.vue'
import ClientAgend from '../components/profile/client/ClientAgend.vue'
import ClientHistoric from '../components/profile/client/ClientHistoric.vue'

export default {
  name: "client",
  components: {
    UserInfo,
    ClientAgend,
    ClientHistoric
  },
  emits: ['addProductToCart', 'LoginLogout', 'changeQntdCart'],
  data() {
    return {
      optionSelect: "info"
    }
  },
  methods: {
    info(){
      this.optionSelect = "info";
    },
    historic(){
      this.optionSelect = "historic"
    },
    agend(){
      this.optionSelect = "agend"
    },
    logout(){
      this.$emit('LoginLogout', null);
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