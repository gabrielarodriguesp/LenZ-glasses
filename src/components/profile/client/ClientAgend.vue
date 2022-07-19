<template>
  <div class="client-agend">
        <!-- Agendamento de Exames -->
    <section class="blueCard"  v-if="currentUser">
      <div class="existing-exams">
        <table v-if="currentUser.exam.length>0">
          <thead>
            <tr>
              <td>Dia</td>
              <td>Hora</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(exam, index) in currentUser.exam" :key="index">
              <td>{{ localizeDate(exam.date)}}</td>
              <td>{{ (exam.time)}}: 00 horas</td>
              <td>
                <button class="importantBtn" @click="cancelExam(exam)">
                  CANCELAR
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 v-else> Você ainda não agendou um exame conosco!</h2>
      </div>
      
      <div class="new-exams">
        <span class="line"></span>
        <br> Marque um Exame:
        <br> Dia: <input type="date" class="blankInput" v-model="examDate" @change="getTime()"> 
        <br> 
        <section  v-if="examDate">
          Horario:
          <select v-model="examTime">
            <option 
              v-for="(userID, hour, index) in avaibleTime"
              :key="index"
              v-show="!userID"
              :value="hour" >{{hour}}:00 hrs</option>
          </select>
        </section>
        <br>
        <button class="importantBtn" @click="markExam()">MARCAR EXAME</button>
      </div>
    </section>
  </div>  
</template>
<script>
import axios from 'axios';

export default {
  name: "ClientAgend",
  data(){
    return {
      examDate: "",
      examTime: null,
      exams: null,
      userID: null,
      currentExam: null,
      currentUser: null,
      avaibleTime: null,
      newDate: true,
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
  async mounted() {
      let user = JSON.parse(localStorage.getItem("loginUser"));
      let res = await axios.get('http://localhost:5000/user/' + user._id);
      this.currentUser = res.data
  },
  methods: {

    markExam() {
      if(!this.examTime){
        alert('É necessario escolher um horario');
        return;
      }

      this.avaibleTime[this.examTime] = this.currentUser._id;
      let examDay = {
        date: this.examDate,
        time: this.avaibleTime
      }

      if(this.newDate){
        axios.post('http://localhost:5000/exam/', examDay)
      } else {
        axios.put('http://localhost:5000/exam/' + examDay.date, examDay.time)
      }
      let examUser = {
        date: this.examDate,
        time: this.examTime
      }
      axios.put('http://localhost:5000/user/exam/new/' + this.currentUser._id, examUser);
      alert('Exame marcado com sucesso!');
      this.$router.go()

    },

    async cancelExam(exam) {
      let res = await axios.get('http://localhost:5000/exam/' + exam.date);
      let examsAvaibleTime = res.data.time;

      examsAvaibleTime[exam.time] = null; // Horario cancelado

      let counterAvaibleTime = 0;
      for(var hour in examsAvaibleTime){
        if(examsAvaibleTime[hour]){
          counterAvaibleTime++;
        }
      }

      //Se nao tem mais horarios marcados, apagar a data
      if(counterAvaibleTime == 0){
        axios.delete('http://localhost:5000/exam/' + exam.date, exam.time);
      }
      //Caso tenha outro horario marcado, modificar para remover apenas o horario 
      else {
        axios.put('http://localhost:5000/exam/' + exam.date, examsAvaibleTime);

      }

      axios.put('http://localhost:5000/user/exam/delete/' + this.currentUser._id, exam);
      alert('Exame cancelado com sucesso!');
      this.$router.go()



    },

    async getTime(){
      if(!this.examDate){
        return null;
      }
      let res = await axios.get('http://localhost:5000/exam/' + this.examDate);
      if(res.data){
        this.avaibleTime = res.data.time;
        this.newDate = false;
      }
      else{
        this.avaibleTime = {
          "7": null,
          "8": null,
          "9": null,
          "10": null,
          "11": null,
        };

        this.newDate = true;
      }
      return;
    }
  }
}
</script>

<style scoped>
td{
  padding-right: 30px; 
  /* margin-right: 30px;  */
}
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