import User from "../../modal/User.js";
import ShortRecord from "../../modal/ShortRecord.js";
import dbMongoose from "../../config/dbMongoose.js"

dbMongoose()

/*

@ WalletAddress => String

*/

export const Login = async (req, res) => {

    const { WalletAddress } = req.body; // Fetching Body Data

    // Checking if WalletAddress exist or not
    if (!WalletAddress) {
        return res.status(502).json({ message: "Please Provide WalletAddress" })
    }
    
    // Checking if user already exist or not
    const FindExistingUser = await User.findOne({ WalletAddress: WalletAddress }).lean()

    if (FindExistingUser) {
        return res.json({ UserData: FindExistingUser, Already_Have_Account: true })
    } else {

        // Generating a random username
        const randomName = Math.floor(Math.random() * 9000) + 1000;

        // Generate a random 6-digit number
        const randomNum = Math.floor(Math.random() * 900000) + 100000;

        // Defining name veriables which will be dynamic
        let UserName = "User"+randomName;
        let SponserCode = randomNum;

        // Creating New User Entry
        const Create_New_User = await User.create({
            Name: UserName,
            WalletAddress: WalletAddress,
            SponserCode: SponserCode
        })

        // Creating A New User Short Record Below
        const Create_ShortRecord = await ShortRecord.create({
            RecordOwner: Create_New_User._id
        })

        return res.json({ UserData: Create_ShortRecord, Already_Have_Account: false })
    }
}