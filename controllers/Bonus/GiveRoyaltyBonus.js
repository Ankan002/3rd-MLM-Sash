import dbMongoose from "../../config/dbMongoose.js"
import RoyaltyBonusEligible from "../../modal/RoyaltyBonus/RoyaltyBonusEligible.js"
import RoyaltyBonusReward from "../../modal/RoyaltyBonus/RoyaltyBonusReward.js"
import PlanInvoice from "../../modal/invoice/PlanInvoice.js"
import TransactionRecipt from "../../modal/TransactionRecord/TransactionRecipt.js"
import ShortRecord from "../../modal/ShortRecord.js"

dbMongoose()


/*

let How many 50$ achived = 5

let how many people purchsed 50$ package = 10

let commison added = 2

total royality reward = 10 * 2 = 20$

royalty reward per peson = 20 / 5 = 4

*/


export const GiveRoyaltyBonus = async (req, res) => {

    let Transaction_Array = []



    const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000); // for 5 minutes

    const FindRecords = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).lean().exec();





    if (!FindRecords) return res.status(500).json("no data found")

    const Find_All_50_Purchase = await PlanInvoice.find({ PackagePrice: "50", createdAt: { $gt: fiveMinutesAgo } }).select("RecordOwner").lean().exec();
    const Find_All_100_Purchase = await PlanInvoice.find({ PackagePrice: "100", createdAt: { $gt: fiveMinutesAgo } }).select("RecordOwner").lean().exec();
    const Find_All_150_Purchase = await PlanInvoice.find({ PackagePrice: "150", createdAt: { $gt: fiveMinutesAgo } }).select("RecordOwner").lean().exec();
    const Find_All_200_Purchase = await PlanInvoice.find({ PackagePrice: "200", createdAt: { $gt: fiveMinutesAgo } }).select("RecordOwner").lean().exec();

    if (!FindRecords) return

    let Club50People = FindRecords.Club50Eligible.length
    let Club100People = FindRecords.Club100Eligible.length
    let Club150People = FindRecords.Club150Eligible.length
    let Club200People = FindRecords.Club200Eligible.length

    // 50$ CLUB PEOPLE WILL GET REWARD FROM HERE

    if (Club50People > 0) {




        let Total_People_In_50_Plan = Find_All_50_Purchase.length;

        let Commison_Added = 2



        let Total_Royality_Reward = Total_People_In_50_Plan * Commison_Added

        let Royalty_Reward_Per_Peson = Total_Royality_Reward / Club50People

        for (let index = 0; index < FindRecords.Club50Eligible.length; index++) {

            
            const Id = FindRecords.Club50Eligible[index].ids


            await RoyaltyBonusReward.create({
                RecordOwner: Id,
                GotReward: Royalty_Reward_Per_Peson,
                CompanyJoinings: Total_People_In_50_Plan,
                IncomePerId: Commison_Added,
                AchievedMembers: Club50People,
                ClubRoyality: Total_Royality_Reward,
                Club: "50$ Club"
            })

            Transaction_Array.push({
                RecordOwner: Id,
                TransactionFrom: "Admin",
                TransactionTo: Id,
                Amount: Number(Royalty_Reward_Per_Peson).toFixed(0),
                Remark: `User Got ${Number(Royalty_Reward_Per_Peson).toFixed(0)}$ From Royalty Bonus On ${new Date()}`,
                Method: "CREDIT",
                TransactionType: "Royalty Bonus"
            })

            /*
            ! CREATING SHORT RECORD FOR THIS RECORD
            */

            const Find_Short_Records = await ShortRecord.findOne({ RecordOwner: Id }).lean()

            let Calculated = Number(Find_Short_Records.TotalRoyaltyIncome) + Number(Royalty_Reward_Per_Peson)

            await ShortRecord.findByIdAndUpdate({ _id: Find_Short_Records._id }, { TotalRoyaltyIncome: Calculated })

        }

    }


    // 100$ CLUB PEOPLE WILL GET REWARD FROM HERE

    if (Club100People > 0) {



        let Total_People_In_100_Plan = Find_All_100_Purchase.length;

        let Commison_Added = 4

        let Total_Royality_Reward = Total_People_In_100_Plan * Commison_Added

        let Royalty_Reward_Per_Peson = Total_Royality_Reward / Club100People

        for (let index = 0; index < FindRecords.Club100Eligible.length; index++) {
            const Id = FindRecords.Club100Eligible[index].ids

            await RoyaltyBonusReward.create({
                RecordOwner: Id,
                GotReward: Royalty_Reward_Per_Peson,
                CompanyJoinings: Total_People_In_100_Plan,
                IncomePerId: Commison_Added,
                AchievedMembers: Club100People,
                ClubRoyality: Total_Royality_Reward,
                Club: "100$ Club"
            })


            Transaction_Array.push({
                RecordOwner: Id,
                TransactionFrom: "Admin",
                TransactionTo: Id,
                Amount: Number(Royalty_Reward_Per_Peson).toFixed(0),
                Remark: `User Got ${Number(Royalty_Reward_Per_Peson).toFixed(0)}$ From Royalty Bonus On ${new Date()}`,
                Method: "CREDIT",
                TransactionType: "Royalty Bonus"
            })



                        /*
            ! CREATING SHORT RECORD FOR THIS RECORD
            */

            const Find_Short_Records = await ShortRecord.findOne({ RecordOwner: Id }).lean()

            let Calculated = Number(Find_Short_Records.TotalRoyaltyIncome) + Number(Royalty_Reward_Per_Peson)

            await ShortRecord.findByIdAndUpdate({ _id: Find_Short_Records._id }, { TotalRoyaltyIncome: Calculated })


        }
    }


    // 150$ CLUB PEOPLE WILL GET REWARD FROM HERE


    if (Club150People > 0) {



        let Total_People_In_150_Plan = Find_All_150_Purchase.length;

        let Commison_Added = 6

        let Total_Royality_Reward = Total_People_In_150_Plan * Commison_Added

        let Royalty_Reward_Per_Peson = Total_Royality_Reward / Club150People

        for (let index = 0; index < FindRecords.Club150Eligible.length; index++) {
            const Id = FindRecords.Club150Eligible[index].ids

            await RoyaltyBonusReward.create({
                RecordOwner: Id,
                GotReward: Royalty_Reward_Per_Peson,
                CompanyJoinings: Total_People_In_150_Plan,
                IncomePerId: Commison_Added,
                AchievedMembers: Club150People,
                ClubRoyality: Total_Royality_Reward,
                Club: "150$ Club"
            })


            Transaction_Array.push({
                RecordOwner: Id,
                TransactionFrom: "Admin",
                TransactionTo: Id,
                Amount: Number(Royalty_Reward_Per_Peson).toFixed(0),
                Remark: `User Got ${Number(Royalty_Reward_Per_Peson).toFixed(0)}$ From Royalty Bonus On ${new Date()}`,
                Method: "CREDIT",
                TransactionType: "Royalty Bonus"
            })

            /*
            ! CREATING SHORT RECORD FOR THIS RECORD
            */

            const Find_Short_Records = await ShortRecord.findOne({ RecordOwner: Id }).lean()

            let Calculated = Number(Find_Short_Records.TotalRoyaltyIncome) + Number(Royalty_Reward_Per_Peson)

            await ShortRecord.findByIdAndUpdate({ _id: Find_Short_Records._id }, { TotalRoyaltyIncome: Calculated })


        }
    }

    // 200$ CLUB PEOPLE WILL GET REWARD FROM HERE


    if (Club200People > 0) {



        let Total_People_In_200_Plan = Find_All_200_Purchase.length;

        let Commison_Added = 8

        let Total_Royality_Reward = Total_People_In_200_Plan * Commison_Added

        let Royalty_Reward_Per_Peson = Total_Royality_Reward / Club200People

        for (let index = 0; index < FindRecords.Club200Eligible.length; index++) {
            const Id = FindRecords.Club200Eligible[index].ids

            await RoyaltyBonusReward.create({
                RecordOwner: Id,
                GotReward: Royalty_Reward_Per_Peson,
                CompanyJoinings: Total_People_In_200_Plan,
                IncomePerId: Commison_Added,
                AchievedMembers: Club200People,
                ClubRoyality: Total_Royality_Reward,
                Club: "200$ Club"
            })

            Transaction_Array.push({
                RecordOwner: Id,
                TransactionFrom: "Admin",
                TransactionTo: Id,
                Amount: Number(Royalty_Reward_Per_Peson).toFixed(0),
                Remark: `User Got ${Number(Royalty_Reward_Per_Peson).toFixed(0)}$ From Royalty Bonus On ${new Date()}`,
                Method: "CREDIT",
                TransactionType: "Royalty Bonus"
            })

            /*
            ! CREATING SHORT RECORD FOR THIS RECORD
            */

            const Find_Short_Records = await ShortRecord.findOne({ RecordOwner: Id }).lean()

            let Calculated = Number(Find_Short_Records.TotalRoyaltyIncome) + Number(Royalty_Reward_Per_Peson)

            await ShortRecord.findByIdAndUpdate({ _id: Find_Short_Records._id }, { TotalRoyaltyIncome: Calculated })


        }
    }




    await TransactionRecipt.insertMany(Transaction_Array)

    res.json("done")
}