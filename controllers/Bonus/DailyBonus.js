import dbMongoose from "../../config/dbMongoose.js";
import PlanInvoice from "../../modal/invoice/PlanInvoice.js";
import DailyReward from "../../modal/DailyReward.js";
import TransactionRecipt from "../../modal/TransactionRecord/TransactionRecipt.js";
import ShortRecord from "../../modal/ShortRecord.js"
// Calling Database
dbMongoose();


export const DailyBonus = async (req, res) => {

  let Transaction_Array = []


  try {

    // Finding Plan Invoices
    const allPackages = await PlanInvoice.find().lean();

    // Going To Map All Packages
    // const dailyRewards = allPackages.map((pkg) => {

    //     // Destructuring All Veriables
    //   const price = Number(pkg.PackagePrice);
    //   const percentage = pkg.DailyReward;
    //   const RecordOwner = pkg.RecordOwner;
    //   const calculateReward = price * percentage / 100;



    //   /*
    //   ! CREATING SHORT RECORD FOR DAILY BONUS
    //   */


    //   Transaction_Array.push({
    //     RecordOwner:pkg.RecordOwner,
    //     TransactionFrom:"Admin",
    //     TransactionTo:pkg.OwnerUsername,
    //     Amount:calculateReward,
    //     Remark:`User Got ${calculateReward}$ From Daily Income On ${new Date()}`,
    //     Method:"CREDIT",
    //     TransactionType:"Daily Income"
    //   })


    //   return {
    //     RecordOwner: pkg.RecordOwner,
    //     StakedPackage: price,
    //     CoinEarned: calculateReward,
    //     CoinPercentage: percentage,
    //     RecordUpperline: pkg.OwnerUpperline,
    //   };
    // });

    const dailyRewards = await Promise.all(allPackages.map(async (pkg) => {

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

     await ShortRecord.findByIdAndUpdate({_id:GET_RECORD._id},{TotalDailyIncome:Calculated_Reward})
     
     
    
      return {
        RecordOwner: pkg.RecordOwner,
        StakedPackage: price,
        CoinEarned: calculateReward,
        CoinPercentage: percentage,
        RecordUpperline: pkg.OwnerUpperline
      };
    }));




    // Creating Final Records For Daily Rewards
    await DailyReward.create(dailyRewards);

    /*
    ! CREATING TRANSACTION RECORD BELOW
    */

    await TransactionRecipt.insertMany(Transaction_Array)

    res.json("Cron Job Done :)");
  } catch (error) {

    // If something wrong happend then it will come here
    console.error(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};