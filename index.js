const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const users = require('./model/users');
const message = require('./model/message');

//GET
app.get('/api/message', async(req,res)=>{
    const a = await message.query()
    return res.status(200).send(a)
})

app.get('/api/message/:nim', async(req, res)=>{
    const {nim} = req.params
    const a = await message.query().where({
        nim: nim
    })

    return res.status(200).send(a)
})

//GET (all/spesific nim) messages dan name (orm foreign key atau manggil 2 database)
/**
 * {
 *   nim: nim,
 *   name: nama,
 *   message: message
 * }
 */


app.get('/api/messageDetail', async(req,res)=>{
    const a = await message.query().join('users', 'message.nim', '=' ,'users.nim').select('message.nim as nim', 'users.name as name', 'message.message as message')
    return res.status(200).send(a)
})

app.get('/api/messageDetail/:nim', async(req,res)=>{
    const {nim} = req.params
    const a = await message.query().join('users', 'message.nim', '=' ,'users.nim').select('message.nim as nim', 'users.name as name', 'message.message as message').where({
        'message.nim':nim
    })

    return res.status(200).send(a)
})


//POST
app.post('/api/message', async(req, res)=>{
    const {nim, pesan} = req.body
    
    await message.query().insert({
        nim: nim,
        message: pesan
    })
    return res.status(200).send({
        message: "Berhasil memasukkan data."
    })
})


//PUT
app.put('/api/message/:nim', async(req, res)=>{
    const param = req.params.nim
    const {pesan} = req.body

    await message.query().update({
        message: pesan
    }).where({
        nim:param
    })

    return res.status(200).send({
        message: "Berhasil update."
    })

})


//DELETE
app.delete('/api/message/:nim', async(req,res)=>{
    const {nim} = req.params
    await message.query().delete().where({
        nim: nim
    })

    return res.status(200).send({
        message: "Berhasil menghapus data."
    })
})



const PORT = process.env.PORT || 8080
app.listen(PORT, () =>{
    console.log(`Listening to the server ${PORT}`)
})