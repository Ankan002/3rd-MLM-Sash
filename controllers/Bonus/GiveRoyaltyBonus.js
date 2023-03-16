import dbMongoose from "../../config/dbMongoose.js"
import RoyaltyBonusEligible from "../../modal/RoyaltyBonus/RoyaltyBonusEligible.js"
import RoyaltyBonusReward from "../../modal/RoyaltyBonus/RoyaltyBonusReward.js"
import PlanInvoice from "../../modal/invoice/PlanInvoice.js"
import TransactionRecipt from "../../modal/TransactionRecord/TransactionRecipt.js"

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

    const FindRecords = await RoyaltyBonusEligible.findOne().lean().exec();

    const Find_All_50_Purchase = await PlanInvoice.find({ PackagePrice: "50" }).select("RecordOwner").lean().exec();
    const Find_All_100_Purchase = await PlanInvoice.find({ PackagePrice: "100" }).select("RecordOwner").lean().exec();
    const Find_All_150_Purchase = await PlanInvoice.find({ PackagePrice: "150" }).select("RecordOwner").lean().exec();
    const Find_All_200_Purchase = await PlanInvoice.find({ PackagePrice: "200" }).select("RecordOwner").lean().exec();

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
        
        for (let index = 0; index < Find_All_50_Purchase.length; index++) {
            const Id = Find_All_50_Purchase[index].RecordOwner

            await RoyaltyBonusReward.create({
                RecordOwner:Id,
                GotReward:Royalty_Reward_Per_Peson,
                CompanyJoinings:Total_People_In_50_Plan,
                IncomePerId:"2",
                AchievedMembers:Club50People,
                ClubRoyality:Total_Royality_Reward,
                Club:"50$ Club"
            })  

            Transaction_Array.push({
                RecordOwner:Id,
                TransactionFrom:"Admin",
                TransactionTo:Id,
                Amount:Number(Royalty_Reward_Per_Peson).toFixed(0),
                Remark:`User Got ${Number(Royalty_Reward_Per_Peson).toFixed(0)}$ From Royalty Bonus On ${new Date()}`,
                Method:"CREDIT",
                TransactionType:"Royalty Bonus"
            })
            
        }

    }

    
    // 100$ CLUB PEOPLE WILL GET REWARD FROM HERE

    if (Club100People > 0) {

        console.log("came here")

        let Total_People_In_100_Plan = Find_All_100_Purchase.length;

        let Commison_Added = 2

        let Total_Royality_Reward = Total_People_In_100_Plan * Commison_Added

        let Royalty_Reward_Per_Peson = Total_Royality_Reward / Club100People

        for (let index = 0; index < Find_All_100_Purchase.length; index++) {
            const Id = Find_All_100_Purchase[index].RecordOwner

            await RoyaltyBonusReward.create({
                RecordOwner:Id,
                GotReward:Royalty_Reward_Per_Peson,
                CompanyJoinings:Total_People_In_100_Plan,
                IncomePerId:"2",
                AchievedMembers:Club100People,
                ClubRoyality:Total_Royality_Reward,
                Club:"100$ Club"
            })  


            Transaction_Array.push({
                RecordOwner:Id,
                TransactionFrom:"Admin",
                TransactionTo:Id,
                Amount:Number(Royalty_Reward_Per_Peson).toFixed(0),
                Remark:`User Got ${Number(Royalty_Reward_Per_Peson).toFixed(0)}$ From Royalty Bonus On ${new Date()}`,
                Method:"CREDIT",
                TransactionType:"Royalty Bonus"
            })
            
        }        
    }


    // 150$ CLUB PEOPLE WILL GET REWARD FROM HERE


    if (Club150People > 0) {

        console.log("came here")

        let Total_People_In_150_Plan = Find_All_150_Purchase.length;

        let Commison_Added = 2

        let Total_Royality_Reward = Total_People_In_150_Plan * Commison_Added

        let Royalty_Reward_Per_Peson = Total_Royality_Reward / Club150People

        for (let index = 0; index < Find_All_100_Purchase.length; index++) {
            const Id = Find_All_100_Purchase[index].RecordOwner

            await RoyaltyBonusReward.create({
                RecordOwner:Id,
                GotReward:Royalty_Reward_Per_Peson,
                CompanyJoinings:Total_People_In_150_Plan,
                IncomePerId:"2",
                AchievedMembers:Club150People,
                ClubRoyality:Total_Royality_Reward,
                Club:"150$ Club"
            })  


            Transaction_Array.push({
                RecordOwner:Id,
                TransactionFrom:"Admin",
                TransactionTo:Id,
                Amount:Number(Royalty_Reward_Per_Peson).toFixed(0),
                Remark:`User Got ${Number(Royalty_Reward_Per_Peson).toFixed(0)}$ From Royalty Bonus On ${new Date()}`,
                Method:"CREDIT",
                TransactionType:"Royalty Bonus"
            })
            
        }        
    }

    // 200$ CLUB PEOPLE WILL GET REWARD FROM HERE


    if (Club200People > 0) {

            console.log("came here")
    
            let Total_People_In_200_Plan = Find_All_200_Purchase.length;
    
            let Commison_Added = 2
    
            let Total_Royality_Reward = Total_People_In_200_Plan * Commison_Added
    
            let Royalty_Reward_Per_Peson = Total_Royality_Reward / Club200People
    
            for (let index = 0; index < Find_All_200_Purchase.length; index++) {
                const Id = Find_All_200_Purchase[index].RecordOwner
    
                await RoyaltyBonusReward.create({
                    RecordOwner:Id,
                    GotReward:Royalty_Reward_Per_Peson,
                    CompanyJoinings:Total_People_In_200_Plan,
                    IncomePerId:"2",
                    AchievedMembers:Club200People,
                    ClubRoyality:Total_Royality_Reward,
                    Club:"200$ Club"
                })  
    
                Transaction_Array.push({
                    RecordOwner:Id,
                    TransactionFrom:"Admin",
                    TransactionTo:Id,
                    Amount:Number(Royalty_Reward_Per_Peson).toFixed(0),
                    Remark:`User Got ${Number(Royalty_Reward_Per_Peson).toFixed(0)}$ From Royalty Bonus On ${new Date()}`,
                    Method:"CREDIT",
                    TransactionType:"Royalty Bonus"
                })
                
            }        
    }




    await TransactionRecipt.insertMany(Transaction_Array)

    res.json("done")
}