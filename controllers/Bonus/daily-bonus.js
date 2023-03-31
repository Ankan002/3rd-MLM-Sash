import PlanRecord from "../../modal/Record/PlanRecord";

export const getDailyBonus = async (req, res) => {
    try {
        const records = await PlanRecord.find();

        records.map((record) => {
            fetch("http://localhost:3000/api/test", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    pkg: record,
                }),
            });
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