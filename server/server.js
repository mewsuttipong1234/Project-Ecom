// Step import
const express = require('express')
const app = express()
const morgan = require('morgan')
const {readdirSync} = require('fs')
const cors = require('cors')
// const authRouter = require('./routes/auth')
// const category = require('./routes/category')


//middleware
app.use(morgan('dev'))
app.use(express.json({limit:'20mb'}))
app.use(cors())
readdirSync('./routes').map((item)=> app.use('/api',require('./routes/'+item)))
// app.use('/api',authRouter)
// app.use('/api',category)
// Step 3 router
// app.post('/api',(req,res)=>{
//     const {username ,password} = req.body
//     console.log(username,password)

//     res.send('ayo')
// })




// Step 2 start serve

app.listen(5000,()=>
    console.log('Server runing on port 5000')
)






