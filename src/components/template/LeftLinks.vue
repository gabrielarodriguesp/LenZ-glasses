<template>
  <li>
    <router-link to="/glasses">
      Óculos de Grau
    </router-link>
  </li>
  <li>
    <router-link to="/sunglasses">
      Óculos de Sol
    </router-link>
  </li>
  <li>
    <router-link to="/lens">
      Lentes de Contato
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'LeftLinks'
}
</script>

<style scoped>
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

.nav-links li {
  display: inline-block;
  padding: 0px 20px;
}

@media (max-width: 890px){
  .dropdown-nav li{
    margin-right: 0;
    padding: 10px;
  }
}
</style>