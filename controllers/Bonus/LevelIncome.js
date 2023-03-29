import dbMongoose from "../../config/dbMongoose.js"
import DailyReward from "../../modal/DailyShortReward.js";
import LevelReward from "../../modal/LevelReward.js"
import ShortRecord from "../../modal/ShortRecord.js"
import PlanRecord from "../../modal/Record/PlanRecord.js"
import TransactionRecipt from "../../modal/TransactionRecord/TransactionRecipt.js";
import User from "../../modal/User.js";

// Calling Database

dbMongoose()

export const LevelIncome = async (req, res) => {

  let Transaction_Array = []
  let Level_Array = []

  try {

    const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000); // for 2 min

    const FindDailyReward = await DailyReward.find({ createdAt: { $gt: fiveMinutesAgo } }).lean();

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
        let Maximum_For_Today = largestValue * 10 / 100 // => 10
        console.log("Maximum_For_Today => "+ Maximum_For_Today)
        let Earnings = 0

        let Find_Today_Level_Earning_Of_This_User = await LevelReward.find({ RecordOwner: element.id, createdAt: { $gt: fiveMinutesAgo } })

        Find_Today_Level_Earning_Of_This_User.map((hit) => {
          return Earnings = Number(Earnings) + Number(hit.CoinEarned)
        })

        console.log("My Tooday Earnig Earnings => "+Earnings)



        if (Earnings >= Maximum_For_Today) continue

        let Loop_Level = index + 1


        if (Loop_Level == 1) {

          if (DirectNumber >= 1) {
            LevelsOpenForThisUser = 1
            RewardPercentage = 10;
          } else {
            continue
          }

        }else if (Loop_Level == 2) {
          if (DirectNumber >= 3) {
            LevelsOpenForThisUser = 2
            RewardPercentage = 10;
          } else {
            continue
          }
        }else if (Loop_Level == 3) {
          if (DirectNumber >= 5) {
            LevelsOpenForThisUser = 3
            RewardPercentage = 10;
          } else {
            continue
          }
        }else if (Loop_Level == 4) {
          if (DirectNumber >= 6) {
            LevelsOpenForThisUser = 4
            RewardPercentage = 6;
          } else {
            continue
          }
        }else if (Loop_Level == 5) {
          if (DirectNumber >= 7) {
            LevelsOpenForThisUser = 5
            RewardPercentage = 6;
          } else {
            continue
          }
        }else if (Loop_Level == 6) {
          if (DirectNumber >= 8) {
            LevelsOpenForThisUser = 6
            RewardPercentage = 2;
          } else {
            continue
          }
        }else if (Loop_Level == 7) {
          if (DirectNumber >= 9) {
            LevelsOpenForThisUser = 7
            RewardPercentage = 2;
          } else {
            continue
          }
        }else if (Loop_Level == 8) {
          if (DirectNumber >= 10) {
            LevelsOpenForThisUser = 8
            RewardPercentage = 2;
          } else {
            continue
          }
        }else{
          continue
        }


          if (Loop_Level > LevelsOpenForThisUser) continue

          let MaximuEarningForThisUser = PackageAmount * Number(RewardPercentage) / 100


          let Latest_Calculation = CoinEarned *  RewardPercentage /100

          let Reward = 0

          let Calculate_Max_Earning = Reward 

          /*
          ! BELOW I AM MANAGING SHORT RECORD FOR LEVEL INCOME
          */

          const Get_Short_Record_Of_Level = await ShortRecord.findOne({ RecordOwner: element.id })

          const Level_Record = parseFloat(Get_Short_Record_Of_Level.TotalLevelIncome)

          const Update_Value = Level_Record + Latest_Calculation

          await ShortRecord.findByIdAndUpdate({ _id: Get_Short_Record_Of_Level._id }, { TotalLevelIncome: Update_Value })

          const Find_Main_User = await User.findById(element.id)

          /*
         ! MANAGING TRANSACTION REPORT
         */

          Transaction_Array.push({
            RecordOwner: element.id,
            TransactionFrom: "Admin",
            TransactionTo: element.id,
            Amount: Latest_Calculation,
            Remark: `User Got ${Latest_Calculation}$ From Level ${LevelsOpenForThisUser} Income On ${new Date()}`,
            Method: "CREDIT",
            TransactionType: "Level Income"
          })


          /*
          ! CREATING RECORD FOR LEVEL RECORD
          */

          Level_Array.push({
            RecordOwner: element.id,
            LevelEarned: Loop_Level,
            CoinEarned:Latest_Calculation,
            EarnedPackage: "package name",
            RewardFrom: RecordOwner,
            RecordUser:Find_Main_User.SponserCode
          })
        }

      }

      /*
        ! HERE BELOW I AM POSTING TRANSACTION RECORDS FOR LEVEL
      */
      await TransactionRecipt.insertMany(Transaction_Array)
      await LevelReward.insertMany(Level_Array)


      res.json("Cron Job Done :)");

    } catch (error) {

      // If something wrong happend then it will come here

      res.status(500).json({ error: "Something Went Wrong" });

    }
  }