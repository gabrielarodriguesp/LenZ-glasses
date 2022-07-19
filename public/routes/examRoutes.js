const Exam = require('../models/Exam')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try{
    const exams = await Exam.find()
    res.status(200).json(exams)
  }
  catch(err){
    res.status(500).json({error: err})
  }
})

router.post('/', async (req, res) => { 
  let {
    date,
    time
  } = req.body;
  const exam = {
    date,
    time
  }

  if(!date){
    console.log('Erro ao adicionar um exame!')
    res.status(422)
    return;
  }
  try{
    await Exam.create(exam)
    res.status(201).json(exam)
  }catch (err){
    res.status(500).json({error: err})
  }
})

router.get('/:date', async (req, res) => {
  const date = req.params.date;
  const exam = await Exam.findOne({date: date})
  try{
    res.status(200).json(exam)
  }
  catch(err){
    res.status(500).json({error: err})
  }
})

router.put('/:date', async(req, res) => {
  const date = req.params.date;
  const exam = await Exam.findOne({date: date});
  exam.time = req.body;
  exam.save();
});

router.delete('/:date', async (req, res) => {
  const date = req.params.date;
  const exam = await Exam.findOne({date: date})
  if(!exam){
    res.status(422).json({message: "Exame nao encontrado"})
    return;
  }
  try{
    await Exam.deleteOne({date: date})
    res.status(200).json({message: 'Exame removido'})
  }
  catch(err){
    res.status(500).json({error: err})
  }
})


module.exports = router
