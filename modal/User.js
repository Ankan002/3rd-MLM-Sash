import mongoose from "mongoose";

const User = new mongoose.Schema({

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
        default:"0xF0a1E5037149D70aedC3cf6E88a452B39d57Ec9B"
    },
    Password:{
        type:String,
        default: null
    },
    SponserCode:{
        type:String,
        required:true
    },
    MyPackages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "MyPackageRecs",
        default: []
    }
},
{
 timestamps: true
})
export default mongoose.models.MyUse || mongoose.model('MyUse', User)
