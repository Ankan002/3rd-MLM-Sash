import dbMongoose from "../../config/dbMongoose.js";
import ShortRecord from "../../modal/ShortRecord.js";
import RoyaltyBonusEligible from "../../modal/RoyaltyBonus/RoyaltyBonusEligible.js";
import PlanRecord from "../../modal/Record/PlanRecord.js";

// Calling Database
dbMongoose();

ShortRecord.createIndexes({ field1: 1 });

/*

! @ Response Exapmle
 {
   _id: new ObjectId("640ed3d3d9c0ee8b1fb5156c"),
   RecordOwner: 'User5641',
   MyDirectsTotalBusiness: 0,
   MyActivePackages: []
 }

*/

// THIS FUNCTION WILL BE RESPONSIBLE FOR GIVING REWARDS ACCORDING TO CLUBNAME
function Give_Reward_According_To_Package(ClubName, id) {


  if (ClubName == "50$ CLUB") {
    Club50(id)
  } else if (ClubName == "100$ CLUB") {
    Club100(id)
  } else if (ClubName == "150$ CLUB") {
    Club150(id)
  } else if (ClubName == "200$ CLUB") {
    Club200(id)
  } else if (ClubName == "500$ CLUB") {
    Club500(id)
  } else if (ClubName == "1000$ CLUB") {
    Club1000(id)
  }

}

// CLUB 50 PEOPLE WILL COME HERE

const Club50 = async (id) => {




  const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


  const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club50Eligible").lean().exec()



  let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club50Eligible

  Old_50$_Record.push({ ids: id })

  Get_Record_For_50$_Club == null ?

    await RoyaltyBonusEligible.create({ Club50Eligible: Old_50$_Record })

    :
    await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club50Eligible: Old_50$_Record })




}


// CLUB 100 PEOPLE WILL COME HERE

const Club100 = async (id) => {
  const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


  const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club100Eligible").lean().exec()

  let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club100Eligible

  Old_50$_Record.push({ ids: id })

  Get_Record_For_50$_Club ?

    await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club100Eligible: Old_50$_Record })

    :

    await RoyaltyBonusEligible.create({ Club100Eligible: Old_50$_Record })

}


// CLUB 150 PEOPLE WILL COME HERE

const Club150 = async (id) => {
  const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


  const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club150Eligible").lean().exec()

  let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club150Eligible

  Old_50$_Record.push({ ids: id })

  Get_Record_For_50$_Club ?

    await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club150Eligible: Old_50$_Record })

    :

    await RoyaltyBonusEligible.create({ Club150Eligible: Old_50$_Record })

}


// CLUB 200 PEOPLE WILL COME HERE

const Club200 = async (id) => {
  const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


  const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club200Eligible").lean().exec()

  let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club200Eligible

  Old_50$_Record.push({ ids: id })

  Get_Record_For_50$_Club ?

    await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club200Eligible: Old_50$_Record })

    :

    await RoyaltyBonusEligible.create({ Club200Eligible: Old_50$_Record })

}


// CLUB 500 PEOPLE WILL COME HERE

const Club500 = async (id) => {
  const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


  const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club500Eligible").lean().exec()

  let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club500Eligible

  Old_50$_Record.push({ ids: id })

  Get_Record_For_50$_Club ?

    await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club500Eligible: Old_50$_Record })

    :

    await RoyaltyBonusEligible.create({ Club500Eligible: Old_50$_Record })

}

// CLUB 1000 PEOPLE WILL COME HERE

const Club1000 = async (id) => {

  const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


  const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club1000Eligible").lean().exec()

  let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club1000Eligible

  Old_50$_Record.push({ ids: id })

  Get_Record_For_50$_Club ?

    await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club1000Eligible: Old_50$_Record })

    :

    await RoyaltyBonusEligible.create({ Club1000Eligible: Old_50$_Record })

}



export const RoyaltyBonus = async (req, res) => {

  try {

    const getAllShortRecord = await ShortRecord.find().select("MyDirectsTotalBusiness RecordOwner MyActivePackages").lean().exec()


    for (let index = 0; index < getAllShortRecord.length; index++) {
      const hit = getAllShortRecord[index];

      let All_Active_Packages = []


      const FindActivePackages = await PlanRecord.find({ RecordOwner: hit.RecordOwner })

      FindActivePackages.map((hit) => {
        if (hit.Type == "Repurchased") return
        All_Active_Packages.push(Number(hit.PackagePrice))
      })



      let PackageAmount = Math.max(...All_Active_Packages) // Checking User Highest Purchased Package




      let This_User_Direct_Business = hit.MyDirectsTotalBusiness // Checking User ALL Direct Businesses


      // FROM BELOW I AM CHECKING IN WHICH PACKAGE THAT USER EXISTS AND WHAT IS THE DIRECT INCOME



      if (This_User_Direct_Business >= 5000 && This_User_Direct_Business < 10000) {
        if (PackageAmount == 50) {


          // Give_Reward_According_To_Package("50$ CLUB",hit.RecordOwner)
          const id = hit.RecordOwner


          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);





          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club50Eligible").lean().exec()



          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club50Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club == null ?

            await RoyaltyBonusEligible.create({ Club50Eligible: Old_50$_Record })

            :
            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club50Eligible: Old_50$_Record })






        } else if (PackageAmount == 100) {

          const id = hit.RecordOwner


          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);





          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club50Eligible").lean().exec()



          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club50Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club == null ?

            await RoyaltyBonusEligible.create({ Club50Eligible: Old_50$_Record })

            :
            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club50Eligible: Old_50$_Record })




        } else if (PackageAmount == 150) {

          // Give_Reward_According_To_Package("150$ CLUB", hit.RecordOwner)


          const id = hit.RecordOwner


          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);





          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club50Eligible").lean().exec()



          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club50Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club == null ?

            await RoyaltyBonusEligible.create({ Club50Eligible: Old_50$_Record })

            :
            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club50Eligible: Old_50$_Record })



        } else if (PackageAmount == 200) {

          // Give_Reward_According_To_Package("200$ CLUB", hit.RecordOwner)

          const id = hit.RecordOwner


          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);





          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club50Eligible").lean().exec()



          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club50Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club == null ?

            await RoyaltyBonusEligible.create({ Club50Eligible: Old_50$_Record })

            :
            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club50Eligible: Old_50$_Record })



        }

      } else if (This_User_Direct_Business >= 10000 && This_User_Direct_Business < 15000) {
        if (PackageAmount == 50) {


          // Give_Reward_According_To_Package("50$ CLUB",hit.RecordOwner)
          const id = hit.RecordOwner


          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);





          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club50Eligible").lean().exec()



          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club50Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club == null ?

            await RoyaltyBonusEligible.create({ Club50Eligible: Old_50$_Record })

            :
            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club50Eligible: Old_50$_Record })






        } else if (PackageAmount == 100) {

          // Give_Reward_According_To_Package("100$ CLUB", hit.RecordOwner)

          let id = hit.RecordOwner

          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club100Eligible").lean().exec()

          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club100Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club ?

            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club100Eligible: Old_50$_Record })

            :

            await RoyaltyBonusEligible.create({ Club100Eligible: Old_50$_Record })

        } else if (PackageAmount == 150) {

          // Give_Reward_According_To_Package("150$ CLUB", hit.RecordOwner)

          // Give_Reward_According_To_Package("100$ CLUB", hit.RecordOwner)

          let id = hit.RecordOwner

          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club100Eligible").lean().exec()

          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club100Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club ?

            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club100Eligible: Old_50$_Record })

            :

            await RoyaltyBonusEligible.create({ Club100Eligible: Old_50$_Record })

        } else if (PackageAmount == 200) {

          // Give_Reward_According_To_Package("200$ CLUB", hit.RecordOwner)


          // Give_Reward_According_To_Package("100$ CLUB", hit.RecordOwner)

          let id = hit.RecordOwner

          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club100Eligible").lean().exec()

          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club100Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club ?

            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club100Eligible: Old_50$_Record })

            :

            await RoyaltyBonusEligible.create({ Club100Eligible: Old_50$_Record })

        }

      } else if (This_User_Direct_Business >= 15000 && This_User_Direct_Business < 20000) {

        if (PackageAmount == 50) {

          const id = hit.RecordOwner


          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);





          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club50Eligible").lean().exec()



          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club50Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club == null ?

            await RoyaltyBonusEligible.create({ Club50Eligible: Old_50$_Record })

            :
            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club50Eligible: Old_50$_Record })



        } else if (PackageAmount == 100) {

          // Give_Reward_According_To_Package("100$ CLUB", hit.RecordOwner)

          let id = hit.RecordOwner

          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club100Eligible").lean().exec()

          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club100Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club ?

            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club100Eligible: Old_50$_Record })

            :

            await RoyaltyBonusEligible.create({ Club100Eligible: Old_50$_Record })

        } else if (PackageAmount == 150) {

          // Give_Reward_According_To_Package("150$ CLUB", hit.RecordOwner)
          let id = hit.RecordOwner


          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club150Eligible").lean().exec()

          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club150Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club ?

            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club150Eligible: Old_50$_Record })

            :

            await RoyaltyBonusEligible.create({ Club150Eligible: Old_50$_Record })

        } else if (PackageAmount == 200) {

          let id = hit.RecordOwner


          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club150Eligible").lean().exec()

          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club150Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club ?

            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club150Eligible: Old_50$_Record })

            :

            await RoyaltyBonusEligible.create({ Club150Eligible: Old_50$_Record })
        }

      } else if (This_User_Direct_Business >= 20000) {

        // if (PackageAmount == 50) {

        //   Give_Reward_According_To_Package("50$ CLUB", hit.RecordOwner)

        // } else if (PackageAmount == 100) {

        //   Give_Reward_According_To_Package("100$ CLUB", hit.RecordOwner)

        // } else if (PackageAmount == 150) {

        //   Give_Reward_According_To_Package("150$ CLUB", hit.RecordOwner)

        // } else if (PackageAmount == 200) {

        // Give_Reward_According_To_Package("200$ CLUB", hit.RecordOwner)

        // }



        if (PackageAmount == 50) {

          const id = hit.RecordOwner


          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);





          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club50Eligible").lean().exec()



          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club50Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club == null ?

            await RoyaltyBonusEligible.create({ Club50Eligible: Old_50$_Record })

            :
            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club50Eligible: Old_50$_Record })



        } else if (PackageAmount == 100) {

          // Give_Reward_According_To_Package("100$ CLUB", hit.RecordOwner)

          let id = hit.RecordOwner

          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club100Eligible").lean().exec()

          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club100Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club ?

            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club100Eligible: Old_50$_Record })

            :

            await RoyaltyBonusEligible.create({ Club100Eligible: Old_50$_Record })

        } else if (PackageAmount == 150) {

          // Give_Reward_According_To_Package("150$ CLUB", hit.RecordOwner)
          let id = hit.RecordOwner


          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club150Eligible").lean().exec()

          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club150Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club ?

            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club150Eligible: Old_50$_Record })

            :

            await RoyaltyBonusEligible.create({ Club150Eligible: Old_50$_Record })

        } else if (PackageAmount == 200) {

          const fiveMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);


          const Get_Record_For_50$_Club = await RoyaltyBonusEligible.findOne({ createdAt: { $gt: fiveMinutesAgo } }).select("_id Club200Eligible").lean().exec()

          let Old_50$_Record = Get_Record_For_50$_Club == null ? [] : Get_Record_For_50$_Club.Club200Eligible

          Old_50$_Record.push({ ids: id })

          Get_Record_For_50$_Club ?

            await RoyaltyBonusEligible.findByIdAndUpdate({ _id: Get_Record_For_50$_Club._id }, { Club200Eligible: Old_50$_Record })

            :

            await RoyaltyBonusEligible.create({ Club200Eligible: Old_50$_Record })
        }

      }


    }

    res.json("done");
  } catch (error) {

    res.status(500).json({ message: "Server Error" });
  }
};