const express = require('express')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname,'..','public')

const port = process.env.PORT || 3000

app.use(express.static(publicPath))                               //serves up all of the assets from that directory
//static takes the path to the public folder and the return value from it is given out to app.use()

app.get('*',(req,res)=>{                                          //all 404 routes are being redirected to index.html
    res.sendFile(path.join(publicPath , 'index.html'))
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})