import dbMongoose from "../../config/dbMongoose.js"
import DailyReward from "../../modal/DailyReward.js";
import LevelReward from "../../modal/LevelReward.js"
import ShortRecord from "../../modal/ShortRecord.js"
import PlanRecord from "../../modal/Record/PlanRecord.js"
import TransactionRecipt from "../../modal/TransactionRecord/TransactionRecipt.js";

// Calling Database

dbMongoose()

export const LevelIncome = async (req, res) => {

  let Transaction_Array = []


  try {

    // Finding Daily Reward Document

    // const FindDailyReward = await DailyReward.find({ createdAt: { $gte: today } }).lean();
    // const FindDailyReward = await DailyReward.find().lean();
    // deposited = 10clock : 10:5
    // 2ndeposied = 10:4  : 10:8  
    // we need to take one globaltime  = in system u need to set 12:00  
    //all deposits in 12:00 - 12:05
    // 12:05 - 12:10
    const tenMinutesAgo = new Date(Date.now() - 50 * 60 * 1000); // calculating a Date object for 10 minutes ago
    // const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000); // calculating a Date object for 1 minute ago
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000); // for 5 minutes


    const FindDailyReward = await DailyReward.find({ createdAt: { $gt: fiveMinutesAgo } }).lean();

    // Going To Map All Daily Reward



    for (let index = 0; index < FindDailyReward.length; index++) {
      const pkg = FindDailyReward[index];


      if (pkg.RecordUpperline == "null") {
        continue;
      }


      // Destructuring All Variables
      const { RecordOwner, CoinEarned } = pkg;

      // Below will be level distribution logic
      const FindShortRecord = await ShortRecord.findOne({ RecordOwner }).lean()

      const AllMyUpperlines = FindShortRecord.MyAllUpperlines

      for (let index = 0; index < AllMyUpperlines.length; index++) {

        const element = AllMyUpperlines[index];

        const UserHasPackage = await PlanRecord.find({ RecordOwner: element.id }).lean()

        if (UserHasPackage.length == 0) {
          continue;
        }

        let FindLargeValue = []

        UserHasPackage.map((hit) => {
          return FindLargeValue.push(Number(hit.PackagePrice))
        })

        let largestValue = Math.max(...FindLargeValue);


        const CheckUserDirects = await ShortRecord.findOne({ RecordOwner: element.id }).lean()

        const DirectNumber = Number(CheckUserDirects.MyDirectNo) // ALL DIRECT NUMBERS ARE HERE

        let PackageAmount = Number(largestValue)

        let RewardPercentage = 0

        let LevelsOpenForThisUser = 0

        // let Maximum_For_Today = 0.5
        let Maximum_For_Today = largestValue * 10 / 100

        let Earnings = 0

        let Find_Today_Level_Earning_Of_This_User = await LevelReward.find({ RecordOwner: element.id, createdAt: { $gt: fiveMinutesAgo } })

        Find_Today_Level_Earning_Of_This_User.map((hit) => {
          return Earnings = Number(Earnings) + Number(hit.CoinEarned)
        })

        if (parseFloat(Earnings).toFixed(2) >= parseFloat(Maximum_For_Today).toFixed(2)) continue


        if (DirectNumber > 0 && DirectNumber < 3) {
          LevelsOpenForThisUser = 1
          RewardPercentage = 10;
        } else if (DirectNumber >= 3 && DirectNumber < 5) {
          LevelsOpenForThisUser = 2
          RewardPercentage = 10;
        } else if (DirectNumber >= 5 && DirectNumber < 6) {
          LevelsOpenForThisUser = 3
          RewardPercentage = 10;
        } else if (DirectNumber == 6) {
          LevelsOpenForThisUser = 4
          RewardPercentage = 6
        } else if (DirectNumber == 7) {
          LevelsOpenForThisUser = 5
          RewardPercentage = 6
        } else if (DirectNumber == 8) {
          LevelsOpenForThisUser = 6
          RewardPercentage = 2
        } else if (DirectNumber == 9) {
          LevelsOpenForThisUser = 7
          RewardPercentage = 2
        } else if (DirectNumber == 10) {
          LevelsOpenForThisUser = 8
          RewardPercentage = 2
        }

        let Loop_Level = index + 1




        if (Loop_Level > LevelsOpenForThisUser) continue


        let MaximuEarningForThisUser = PackageAmount * Number(RewardPercentage) / 100

        let Reward = CoinEarned * RewardPercentage / 100

        let Calculate_Max_Earning = Reward > MaximuEarningForThisUser ? MaximuEarningForThisUser : Reward

        /*
        ! BELOW I AM MANAGING SHORT RECORD FOR LEVEL INCOME
        */

        const Get_Short_Record_Of_Level = await ShortRecord.findOne({ RecordOwner: element.id })

        const Level_Record = parseFloat(Get_Short_Record_Of_Level.TotalLevelIncome)


        
        
        
        const Update_Value = Level_Record + Calculate_Max_Earning
        
        





        await ShortRecord.findByIdAndUpdate({ _id: Get_Short_Record_Of_Level._id }, { TotalLevelIncome: Update_Value })

        /*
       ! MANAGING TRANSACTION REPORT
       */



       TransactionRecipt.create({
          RecordOwner: element.id,
          TransactionFrom: "Admin",
          TransactionTo: element.id,
          Amount: Number(Calculate_Max_Earning),
          Remark: `User Got ${Calculate_Max_Earning}$ From Level ${LevelsOpenForThisUser} Income On ${new Date()}`,
          Method: "CREDIT",
          TransactionType: "Level Income"
        })


        /*
        ! CREATING RECORD FOR LEVEL RECORD
        */

        await LevelReward.create({

          RecordOwner: element.id,
          LevelEarned: Loop_Level,
          CoinEarned: Number(Calculate_Max_Earning).toFixed(2),
          EarnedPackage: "package name",
          RewardFrom: RecordOwner

        })
      }






    }




    



    /*
      ! HERE BELOW I AM POSTING TRANSACTION RECORDS FOR LEVEL
    */
    // await TransactionRecipt.insertMany(Transaction_Array)


    res.json("Cron Job Done :)");

  } catch (error) {

    // If something wrong happend then it will come here

    res.status(500).json({ error: "Something Went Wrong" });

  }
}