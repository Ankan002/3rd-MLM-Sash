import mongoose from "mongoose";

const User = mongoose.Schema({

    Name:{
        type:String,
        required:true
    },
    WalletAddress:{
        type:String,
        required:true
    },
    UpperlineUser:{
        type:String,
        default: null
    },
    Password:{
        type:String,
        default: null
    },
    SponserCode:{
        type:String,
        required:true
    }
},
{
 timestamps: true
})
export default mongoose.models.MyUsers || mongoose.model('MyUsers', User)
