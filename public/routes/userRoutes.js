const User = require('../models/User')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try{
    const users = await User.find()
    res.status(200).json(users)
  }
  catch(err){
    res.status(500).json({error: err})
  }
})

router.post('/', async (req, res) => {
  // Cliente novo, lista de compras vazia
  let orders = [];
  let exam = [];
  const admin = false;
  
  let {
    email,
    password,
    info
  } = req.body;
  
  const user = {
    email,
    password,
    admin,
    orders,
    info,
    exam
  }

  if(!email){
    console.log('Erro ao adicionar usuario!')
    res.status(422)
    return;
  }
  try{
    await User.create(user)
    res.status(201).json(user)
  }catch (err){
    res.status(500).json({error: err})
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({_id: id})

  if(!user){
    res.status(422).json({message: "Usuario nao encontrado"})
    return;
  }  
  try{
    res.status(200).json(user)
  }
  catch(err){
    res.status(500).json({error: err})
  }
})

router.put('/info/:id', async(req, res) => {
  const id = req.params.id;
  const user = await User.findOne({_id: id});
  user.info = req.body.info;
  user.email = req.body.email;
  user.save();
});

router.put('/admin/:id', async(req, res) => {
  const id = req.params.id;
  const user = await User.findOne({_id: id});
  user.admin = !user.admin;
  
  user.save();
});


//router.put('/pass/:id', async(req, res) => {
  //const id = req.params.id;
  //const user = await User.findOne({_id: id});
  //user.password = !user.admin;
  //console.log(req.body)
  //user.save(req.body);
//});

router.put('/order/:id', async(req, res) => {
  const id = req.params.id;
  const user = await User.findOne({_id: id})
  user.orders.push(req.body)
  user.save();
});

router.put('/exam/new/:id', async(req, res) => {
  const id = req.params.id;
  const user = await User.findOne({_id: id})
  user.exam.push(req.body)
  user.save();
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({_id: id})

  if(!user){
    res.status(422).json({message: "Usuario nao encontrado"})
    return;
  }

  try{
    await User.deleteOne({_id: id})
    res.status(200).json({message: 'Usuario removido'})
  }
  catch(err){
    res.status(500).json({error: err})
  }
})

router.put('/exam/delete/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({_id: id})
  const examToDel = req.body;
  let index = -1;
  for(let i = 0; i < user.exam.length; i++){
    if(user.exam[i].time == examToDel.time 
        && user.exam[i].date == examToDel.date){
      index = i;
    }
  }
  if(index < 0){
    res.status(422).json({message: "Exame nao encontrado"})
    return;
  }
  user.exam.splice(index, 1);
  user.save();
  res.status(200).json({message: 'Exame atualizado'})
})



module.exports = router