<template>
  <div class="client-agend">
        <!-- Agendamento de Exames -->
    <section class="blueCard">
      <h2 v-if="exams.length==0"> Você ainda não agendou um exame conosco! </h2>
      <table v-if="exams.length>0">
        <thead>
          <tr>
            <td>Dia</td>
            <td>Hora</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(exam, index) in exams" :key="index">
            <td>{{ localizeDate(exam.date)}}</td>
            <td>{{ exam.time }}</td>
            <td>
              <button class="importantBtn" @click="cancelExam(index)">
                CANCELAR
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <section class="line"></section>
      <br> Marque um Exame:
      <br> Dia: <input type="date" class="blankInput" v-model="tempExamDate"> 
      <br> Hora: <input type="time" class="blankInput" v-model="tempExamTime"> 
      <button class="importantBtn" @click="markExam()">MARCAR EXAME</button>  
    </section>
  </div>  
</template>

<script>
export default {
  name: "ClientAgend",
  data(){
    return {
      tempExamDate: "",
      tempExamTime: "",
      exams: [],
      rightArrowBtn: 'arrowBtn',
      leftArrowBtn: 'arrowBtn',
    }
  },
  computed: {
    localizeDate(){
      return(date)=>{
        if (!date || !date.includes('-')) {
          return date
        }
        const [yyyy, mm, dd] = date.split('-')
        return `${dd}/${mm}/${yyyy}`
      }
    },
  },
  methods: {
    markExam() {
      let obj = {date: this.tempExamDate, time: this.tempExamTime}
      this.exams.push(obj)
    },
    cancelExam(x) {
      this.exams.splice(x, 1)
    },
  }
}
</script>

<style scoped>
.blueCard {
  background-color: #99D9EA;
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  font-family: Georama, Verdana, sans-serif;
  font-size: 16px;
  box-sizing: border-box
}

.line{
  width: 100%;
  height: 5px;
  background-color: black;
}

.blankInput{
  height: 24px;
  border-radius: 5px;
  background-color: white;
  border: none;
  box-shadow: inset 1px 1px 3px 0px black;
  padding: 5px;
  width: 70%;
}

.importantBtn{
  background-color: #3649F5;
  border: none; 
  border-radius: 20px;
  text-align: center;
  width: 150px;
  height: 35px;
  color: white;
  font-weight: bold;
  font-family: Georama, Verdana, sans-serif;
  margin-top: 20px;
}
</style>