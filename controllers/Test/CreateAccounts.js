import dbMongoose from "../../config/dbMongoose.js";
import User from "../../modal/User.js";
import ShortRecord from "../../modal/ShortRecord.js";

// Calling Database
dbMongoose();



export const CreateAccounts = async (req, res) => {
    let num = 0;
    const users = [];

    while (num < 50000) {
        let WalletAddress = "sdhgsdhglsdj"

        // Checking if WalletAddress exist or not
        if (!WalletAddress) {
            return res.status(502).json({ message: "Please Provide WalletAddress" })
        }

        // Generating a random username
        const randomName = Math.floor(Math.random() * 9000) + 1000;

        // Generate a random 6-digit number
        const randomNum = Math.floor(Math.random() * 900000) + 100000;

        // Defining name veriables which will be dynamic
        let UserName = "User" + randomName;
        let SponserCode = randomNum;

        // Creating New User Entry
        users.push({
            RecordOwner: UserName
        });

        num = num + 1;
    }

    // Creating all the users at once
    await ShortRecord.insertMany(users);

    return res.json("done");
};

