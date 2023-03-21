import dbMongoose from "../../config/dbMongoose.js";
import PlanInvoice from "../../modal/Record/PlanRecord.js";
import DailyReward from "../../modal/DailyReward.js";
import TransactionRecipt from "../../modal/TransactionRecord/TransactionRecipt.js";
import ShortRecord from "../../modal/ShortRecord.js"


dbMongoose();


export const DailyBonus = async (req, res) => {

  let Transaction_Array = []


  try {

    // Finding Plan Invoices
    const allPackages = await PlanInvoice.find().lean();

    for (const pkg of allPackages) {

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