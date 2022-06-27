<template>
  <footer>
    <div class="box-cell box1"> 
      <h1 style="text-align:left;"> SOBRE NÓS </h1>
      <ul>
        <li><a href="https://github.com/gabrielarodriguesp" target="_blank"> Gabriela Rodrigues do Prado </a><br></li>
        <li><a href="https://github.com/StrenjaX" target="_blank">Osni Brito de Jesus</a><br></li>
        <li><a href="https://github.com/henriqueggdo" target="_blank">Henrique Garcia Gomes do O</a><br></li>
      </ul>
    </div> 
      
    <div class="box-cell box2"> 
      <ul>
        <h1 style="text-align:center;"> LINKS ÚTEIS </h1>
          <router-link to="/glasses" >Óculos de Grau</router-link><br>
          <router-link to="/sunglasses">Óculos de Sol</router-link><br>
          <router-link to="/lens">Lentes de Contato</router-link><br>
      </ul>
    </div> 
      
    <div class="box-cell box3"> 
      <ul>
        <h1 style="text-align:right;"> ATENDIMENTO </h1>
        <a href="" target="_blank"> atendimento.sac@lenz.com </a><br>
        <a href="" target="_blank"> (12)3456-7890 </a><br>
        <a href="" target="_blank">Segunda a sexta, 8:00h - 18:00h</a><br>
      </ul>
    </div> 
  </footer>
      
</template>

<script>

export default {
  name: "Footer"
}
</script>

<style scoped>



footer{
  height: 200px;
  width: 100%;
  background-color: #48C9B0;
  display: flex;
  flex-direction: row;  
  justify-content: space-around;
  color: white;
}

footer a{
  text-decoration: none;
  color: white;
}

footer .box-cell.box1 .box-cell.box2 .box-cell.box3{ 
  align-items:left; 
} 
</style>