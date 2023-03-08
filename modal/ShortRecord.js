import mongoose from "mongoose";

const ShortRecord = mongoose.Schema({

    RecordOwner: {
        type: String,
        required: true
    },
    MyDirectNo: {
        type: Number,
        default: 0
    },
    MyDirectsTotalBusiness: {
        type: Number,
        default: 0
    },
    MyUpperlineId: {
        type: String,
        default: null
    },
    MyUpperlinePosition: {
        type: String,
        default: null
    },
    MyWallet: {
        type: Number,
        default: 0
    },
    TotalLevelIncome: {
        type: Number,
        default: 0
    },
    TotalDirectIncome: {
        type: Number,
        default: 0
    },
    TotalRoyaltyIncome: {
        type: Number,
        default: 0
    },
    TotalWithdrawal: {
        type: Number,
        default: 0
    },
    MyWalletAddress: {
        type: String,
        default: null
    },
    MySponsorCode: {
        type: String,
        default: null
    },
    MyAllUpperlines: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    MyActivePackages: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    IsAdmin: {
        type: Boolean,
        default: false
    },
    AvailableWithdrawal: {
        type: Number,
        default: 0
    },
    TotalTransfer: {
        type: Number,
        default: 0
    },
    TransferNo: {
        type: Number,
        default: 0
    },
    IsUserActive: {
        type: Boolean,
        default: true
    },
    LevelCaping: {
        type: Number,
        default: 0
    }
    
},
    {
        timestamps: true
    })
export default mongoose.models.ShortRecord || mongoose.model('ShortRecord', ShortRecord)
