import dbMongoose from "../../config/dbMongoose.js";
import PlanInvoice from "../../modal/Record/PlanRecord.js";
import DailyReward from "../../modal/DailyReward.js";
import TransactionRecipt from "../../modal/TransactionRecord/TransactionRecipt.js";
import ShortRecord from "../../modal/ShortRecord.js"
import DailyShortReward from "../../modal/DailyShortReward.js"


dbMongoose();


export const DailyBonus = async (req, res) => {

  let Transaction_Array = []


  try {

    // Finding Plan Invoices
    const allPackages = await PlanInvoice.find().lean();

    // for (const pkg of allPackages) {

      for (let index = 0; index < allPackages.length; index++) {
        const pkg = allPackages[index];
      

      const price = Number(pkg.PackagePrice);
      const percentage = pkg.DailyReward;
      const RecordOwner = pkg.RecordOwner;
      const calculateReward = price * percentage / 100;

      /*
        ! HERE MANAGING SHORT RECORD FOR DAILY BONUS
      */
    
      const GET_RECORD = await ShortRecord.findOne({RecordOwner:pkg.RecordOwner})
    
      const Daily_Bonus = GET_RECORD.TotalDailyIncome
    
      const Calculated_Reward = Daily_Bonus + calculateReward
      const updates =  await ShortRecord.findByIdAndUpdate({_id:GET_RECORD._id},{TotalDailyIncome:Calculated_Reward})
    
      DailyReward.create({
        RecordOwner: pkg.RecordOwner,
        StakedPackage: price,
        CoinEarned: calculateReward,
        CoinPercentage: percentage,
        RecordUpperline: pkg.OwnerUpperline
      });

      const Get_Daily_Short_Reward = await DailyShortReward.findOne({RecordOwner:pkg.RecordOwner}).lean();


      

      if (!Get_Daily_Short_Reward) {

        
        
        await DailyShortReward.create({
          RecordOwner: pkg.RecordOwner,
          StakedPackage: price,
          CoinEarned: calculateReward,
          CoinPercentage: percentage,
          RecordUpperline: pkg.OwnerUpperline
        })
        
      }else{
        
        console.log("price => "+calculateReward)
        console.log("CoinEarned => "+Get_Daily_Short_Reward.CoinEarned)
        let nums = Number(calculateReward)+Number(Get_Daily_Short_Reward.CoinEarned)

        await DailyShortReward.findByIdAndUpdate({_id:Get_Daily_Short_Reward._id},{CoinEarned:nums})

      }


    }
    
    /*
    ! CREATING TRANSACTION RECORD BELOW
    */

    await TransactionRecipt.insertMany(Transaction_Array)

    res.json("Cron Job Done :)");
  } catch (error) {

    // If something wrong happend then it will come here
    
    res.status(500).json({ error: "Something Went Wrong" });
  }
};