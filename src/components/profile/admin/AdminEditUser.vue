<template>
<section id="cart-container">
<table width="100%">
      <thead>
        <td>Remover</td>
        <td>Nome</td>
        <td>Email</td>
        <td>Admin/Cliente</td>
      </thead>
      <tbody
        v-for="(user) in users"
        :key="user._id"
      >
        <tr v-if="currentUser._id != user._id">
          <td>
            <i class="fa fa-trash" @click="removeUser(user)"></i></td>
          <td>
            <h5>{{user.info.name}}</h5>
          </td>
          <td>
            <h4>{{user.email}}</h4>
          </td>
          <td>
            <input v-if="user.admin" checked type="checkbox" @change="changeAdmin(user)">
            <input v-else type="checkbox" @change="changeAdmin(user)">
          </td>
        </tr>
      </tbody>
    </table>
</section>
  
</template>

<script>
import axios from 'axios';


export default{
  name: 'AdminEditUser',
  data() {
    return {
      users: null,
      currentUser: null,
    }
  },

  created() {
    this.getUsers();
  },
  methods: {
    removeUser(user){
      axios.delete('http://localhost:5000/user/' + user._id)
      alert('Usuario removido com sucesso!')
      this.$router.go()
    },
    async getUsers() {
      const req = await fetch('http://localhost:5000/user');
      const data = await req.json();
      this.users = data;

      this.currentUser = JSON.parse(localStorage.getItem("loginUser"))
    },
    changeAdmin(user) {
      let changeState;
      if(!user.admin)
        changeState = 'admin'
      else
        changeState = 'cliente'

      let text = "Transformar " + user.info.name + ' em ' + changeState + '?';
      if (confirm(text) == true) {
        axios.put('http://localhost:5000/user/admin/' + user._id, user)
      }
    }
  }
}
</script>

<style scoped>
#cart-container table thead{
  font-weight: bold;
}

#cart-container table thead td{
  background-color: #48C9B0;
  border: none;
  padding: 6px 0;
}

#cart-container table td{
  border: 1px solid;
  text-align: center;
}
td:first-child { 
  width: 80px  
}
.product-img{
  width: 150px;
  height: 150px;
}

#qtndInput{
  width: 50px;
}

.btn{
  width: 250px;
  height: 45px;
  background-color: #48C9B0;
  border-radius: 15px;
  text-align: center;
  line-height: 40px;
  margin: 30px;
  display: block;
}

.btn:hover{
  box-shadow: 0px 5px 5px gray;
  background-color: #99D9EA;
  cursor: pointer;
}
.continue-buy{
  float: left;
}
.ckeckout-button {
  float: right;
}

li, a {
  font-family: 'Lilita One', cursive;
  text-decoration: none;
  color: #4D5656;
}

a:hover{
  color: black;
  border-color: #4D5656;
  border-bottom: 2px solid #4D5656;
}
td{
  border: 1px solid;
}
</style>