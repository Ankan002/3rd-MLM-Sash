import dbMongoose from "../../config/dbMongoose.js";
import User from "../../modal/User.js";
import ShortRecord from "../../modal/ShortRecord.js";
import PlanRecord from "../../modal/Record/PlanRecord.js";
import PlanInvoice from "../../modal/invoice/PlanInvoice.js";

// Calling Database
dbMongoose();

// THIS FUNCTION GIVE RANDOM WALLET ADDRESS
function generateWalletAddress() {
    var length = 40
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    result += Math.floor(Math.random() * 1000);

    return "0x" + result;
}

export const CreateAccounts = async (req, res) => {

    const { FirstWalletAddress } = req.body

    if (!FirstWalletAddress) return res.status(500).json("Please Give Primary Wallet Address")

    let num = 0
    let List_Of_Account = []
    let Short_Records_Of_Account = []
    let Purchased_Package_Of_Account_Record = []
    let Purchased_Package_Of_Account_Invoice = []

    /*
    ! CREATING ACCOUNT WITH GIVEN WALLET ADDRESS
    */
    let User_Count = 0
    while (num < 500) {

        var Random_Wallet_Number_Is = generateWalletAddress()  // <=====< GENERATING WALLET ADDRESS

        List_Of_Account.push({
            Name: "User" + num,
            WalletAddress: User_Count == 0 ? FirstWalletAddress : Random_Wallet_Number_Is,
            UpperlineUser: User_Count == 0 ? "null" : User_Count == 1 ? FirstWalletAddress : Save_Upperline_Wallet,
            Password: "noneedofthis",
            SponserCode: "noneedofthis"
        })

        var Save_Upperline_Wallet = Random_Wallet_Number_Is
        User_Count = User_Count + 1
        num = num + 1

    }

   var ListOfAccount = (await User.insertMany(List_Of_Account)).map((hit)=>{

    Short_Records_Of_Account.push({
        RecordOwner:hit._id
    })

    Purchased_Package_Of_Account_Record.push({
        RecordOwner:hit._id,
        OwnerUsername:hit.Name,
        OwnerSponsorId:hit.SponserCode,
        OwnerUpperline:hit.UpperlineUser,
        PackageName:"PACKAGE 1",
        PackagePrice:50,
        DailyReward:1,
        MaxDays:"200",
        PackagePurchasedOn:"today",
        PackageExpireOn:"after 200 days",
        TotalEarnedFromThisPackage:0,
        TotalLeftEarningsFromThisPackage:0,
        Type:"Basic"
    })
    Purchased_Package_Of_Account_Invoice.push({
        RecordOwner:hit._id,
        OwnerUsername:hit.Name,
        OwnerSponsorId:hit.SponserCode,
        OwnerUpperline:hit.UpperlineUser,
        PackageName:"PACKAGE 1",
        PackagePrice:50,
        DailyReward:1,
        MaxDays:"200",
        PackagePurchasedOn:"today",
        PackageExpireOn:"after 200 days",
        TotalEarnedFromThisPackage:0,
        TotalLeftEarningsFromThisPackage:0,
        Type:"Basic"
    })
    

   })



   /*
   ! CREATING SHORT RECORD FOR ALL THOSE USERS
   */

   await ShortRecord.insertMany(Short_Records_Of_Account)
   
   /*
   ! PURCHASING PACKAGES FOR ALL THOSE USERS
   */
  
   await PlanRecord.insertMany(Purchased_Package_Of_Account_Record)
   await PlanInvoice.insertMany(Purchased_Package_Of_Account_Invoice)


    return res.json("done");
};

