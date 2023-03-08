import mongoose from 'mongoose'
import {MONGODB_URI} from "../helper/BASE_CONFIG.js"

function initDB(){
    if(mongoose.connections[0].readyState){
        console.log('already connected')
        return
    }

    mongoose.connect(MONGODB_URI,{
        useNewUrlParser : true,
        useUnifiedTopology:true

    })
    mongoose.connection.on('connected',()=>{
        console.log('Database Connected Successfully :)')
    })
    mongoose.connection.on('error',(err)=>{
        console.log(err)
    })
}


export default initDB; 