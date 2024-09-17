import express from 'express'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
import fs from 'fs'

const app = express()
app.use(cors())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'uploads'))
    } catch (e) {}
    cb(null, path.join(process.cwd(), 'uploads'))
  },
  filename: function (req, file, cb) {
    const fileType = file.mimetype.split('/')[1]
    console.log('fileType', fileType)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname
    cb(null, uniqueSuffix)
  },
})
const upload = multer({
  dest: 'uploads/',
  storage,
})

app.post('/upload', upload.single('file'), function (req, res, next) {
  console.log('req.file', req)
  console.log('req.body', req.body)

  res.json({
    message: '文件上传成功',
  })
})

app.listen(3333)
