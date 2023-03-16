import mongoose from "mongoose";

const PackageRecord = mongoose.Schema({

    RecordOwner: {
        type: String,
        required: true
    },
    OwnerUsername: {
        type: String,
        required: true
    },
    OwnerSponsorId: {
        type: String,
        required: true
    },
    PackageName: {
        type: String,
        required: true
    },
    PackagePrice: {
        type: Number,
        required: true
    },
    DailyReward: {
        type: Number,
        required: true
    },
    MaxDays: {
        type: String,
        required: true
    },
    PackagePurchasedOn: {
        type: String,
        required: true
    },
    PackageExpireOn: {
        type: String,
        required: true
    },
    TotalEarnedFromThisPackage: {
        type: Number,
        required: true
    },
    TotalLeftEarningsFromThisPackage: {
        type: Number,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    expireAt: { 
        type: Date,
        default: Date.now,
        expires: 1800 
    }

},
    {
        timestamps: true
    },
)
export default mongoose.models.PackageRecor || mongoose.model('PackageRecor', PackageRecord)
