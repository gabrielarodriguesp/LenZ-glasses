const Product = require('../models/Product')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const {GridFsStorage} = require("multer-gridfs-storage");
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectId;
const Grid = require('gridfs-stream');


const mongoUR = 'mongodb+srv://projetoWEB:5ouOZ6Qm4urNokYE@cluster0.kcm0o.mongodb.net/?retryWrites=true&w=majority'


const conn = mongoose.createConnection(mongoUR);
let gfs, gridfsBucket;
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
  bucketName: 'uploadImages'
});
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploadImages');
})

const storage = new GridFsStorage({
  url: mongoUR,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploadImages"
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer ({storage});

router.post('/', upload.array('file', 5) , async (req, res)=> {
  imgs = []

  // Imagens serao salvas no banco,
  // na variavel 'imgs' ficara IDs
  // que com eles sera possivel recuperar as imagens do banco
  if(req.files){
    for(let i = 0; i < req.files.length; i++){
      imgs[i] = req.files[i].id;
    }   
  }
  
  // Pega informacao do body enviado
  let {
    name,
    amount,
    price,
    category,
    warranty,
    gender,
    description 
  } = req.body;

  description = JSON.parse(description)
  // controi um produto com o body + imagens
  const product = {
    name,
    amount,
    price,
    category,
    warranty,
    gender,
    imgs,
    description,
  }
  if(!name){
    console.log('Erro ao adicionar produto!')
    res.status(422)
    return;
  }
  try{
    await Product.create(product)
    res.status(201).json(product)
    
    // res.status(201).json({message: 'Produto adicionado'})
  }catch (err){
    res.status(500).json({error: err})
  }
})

router.get('/', async (req, res) => {
  try{
    const products = await Product.find()
    res.status(200).json(products)
  }
  catch(err){
    res.status(500).json({error: err})
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({_id: id})

  if(!product){
    res.status(422).json({message: "Produto nao encontrado"})
    return;
  }  
  try{
    res.status(200).json(product)
  }
  catch(err){
    res.status(500).json({error: err})
  }
})


router.get('/image/:id', (req, res) => {
  // params.id e uma string, 
  // e preciso converter em objectID para colocar no banco
  obj_id = ObjectID(req.params.id)
  gfs.files.findOne({ _id: obj_id }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Arquivo nao existe'
      });
    }

    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Arquivo nao e uma imagem'
      });
    }
  });
});

router.put('/:id', async(req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({_id: id})
  Object.assign(product, req.body)
  product.save();
});

router.put('/amount/:id', async(req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({_id: id})
  Object.assign(product, req.body)
  product.save();
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({_id: id})

  if(!product){
    
    res.status(422).json({message: "Produto nao encontrado"})
    return;
  }

  try{
    await Product.deleteOne({_id: id})
    res.status(200).json({message: 'Produto removido'})
  }
  catch(err){
    res.status(500).json({error: err})
  }
})



module.exports = router