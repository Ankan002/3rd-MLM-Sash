import PlanRecord from "../../modal/Record/PlanRecord.js";

export const getDailyBonus = async (req, res) => {
    try {
        const records = await PlanRecord.find();

        console.log(records);

        records.map((record) => {
            try {
                fetch("http://localhost:3000/api/test", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        pkg: record,
                    }),
                });
            } catch (error) {
                console.log(error);
            }
        });

        return res.status(200).json({
            success: true,
            message: "Completed..."
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            error: "Internal Server Error!!",
        });
    }
};
