import mongoose from "mongoose";

const PackageRecord = new mongoose.Schema({

    RecordOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MyUse",
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
    OwnerUpperline: {
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
        expires: 43200 
    }

},
    {
        timestamps: true
    },
)
export default mongoose.models.MyPackageRecs || mongoose.model('MyPackageRecs', PackageRecord)
