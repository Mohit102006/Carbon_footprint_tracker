import { footPrint } from "../models/footprints.model.js";
import { User } from "../models/user.model.js"
import mongoose from "mongoose";
const emissionFactors = {
    Transport: {
        Car: 0.192,          // kg CO₂/km (average petrol car in India)
        ElectricCar: 0.12,   // kg CO₂/km (India grid average)
        Bus: 0.05,           // kg CO₂/km (public diesel bus)
        Bike: 0.1,           // kg CO₂/km (average petrol two-wheeler)
        Train: 0.03,         // kg CO₂/km (Indian Railways average)
        Plane: 0.18,         // kg CO₂/km (short-haul average)
        Walk: 0              // zero emissions
    },
    Electricity: {
        Home: 0.82,          // kg CO₂/kWh (India grid average per UNFCCC)
        Office: 0.75,        // slightly lower due to efficiency
        Industry: 0.9,       // higher due to heavy machinery
        Renewable: 0.05      // solar/wind average
    },
    Food: {
        Beef: 27,
        Mutton: 27,          // updated to global average for lamb/mutton
        Chicken: 6.9,
        Vegetarian: 2,
        Vegan: 1.5,
        Dairy: 3,
        Seafood: 5
    },
    Water: {
        Shower: 0.001,
        Laundry: 0.002,
        Dishwashing: 0.0015,
        Gardening: 0.002,
        Filtered: 0.0005
    },
    Waste: {
        Plastic: 1.8,
        Paper: 1.2,
        Metal: 2.5,
        Organic: 0.5,
        "E-waste": 3,
        Glass: 1.5
    },
    Shopping: {
        Clothing: 0.012,       // 12 kg CO₂e per ₹1,000
        Electronics: 0.015,    // refined to 15 kg CO₂e per ₹1,000
        Furniture: 0.018,
        Groceries: 0.004,
        Luxury: 0.03
    }
};

export const Log = async (req, res) => {
    try {
        const { category, subcategory, amount, date } = req.body
        const factor = emissionFactors[category][subcategory];
        const footprint = amount * factor;
        const userID = req.user.id
        const model = new footPrint({
            userId: req.user.id,
            category,
            subcategory,
            amount,
            footprint,
            date
        });
        try {
            await model.save();
        } catch (err) {
            return res.status(500).json({ success: 0, message: "Error occurred" });
        }
        return res.json({ message: "Entry saved", success: true })
    } catch (error) {
        return res.json({ message: "server error", success: false })
    }
}

export const getTotal = async (req, res) => {
    const userId = req.user.id
    const user = await User.findOne({ _id: userId })
    const name = user.name;
    const email = user.email;
    const d = user.createdAt;
    const pimg = user.ProfileImg;
    const date = new Date(d);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const createDate = date.toLocaleDateString('en-US', options);
    try {
        const result = await footPrint.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.id),
                    footprint: { $exists: true, $ne: null },
                },
            },
            {
                $group: {
                    _id: req.user.id,
                    totalFootprint: { $sum: { $toDouble: "$footprint" } },
                },
            },
        ]);

        const dailyAvg = await footPrint.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    footprint: { $exists: true, $ne: null },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" },
                    },
                    dailyTotal: { $sum: { $toDouble: "$footprint" } }, // ✅ fixed field name
                },
            },
            {
                $group: {
                    _id: null,
                    avgDailyFootprint: { $avg: "$dailyTotal" },
                },
            },
        ]);

        const totalFootprint = result.length > 0 ? result[0].totalFootprint : 0;
        const avgDailyFootprint = dailyAvg.length > 0 ? dailyAvg[0].avgDailyFootprint : 0
        res.json({ total: totalFootprint, dailyAvg: avgDailyFootprint, name: name, email: email, date: createDate, pi:pimg ,  success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error while calculating total footprint",
        });
    }


}

export const getLast10Days = async (req, res) => {

     try {
        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Get date 10 days ago
        const today = new Date();
        const last10Days = new Date();
        last10Days.setDate(today.getDate() - 9); // include today (10 days)

        const data = await footPrint.aggregate([
            {
                $match: {
                    userId: userId,
                    date: { $gte: last10Days, $lte: today },
                    footprint: { $exists: true, $ne: null },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" },
                    },
                    total: { $sum: { $toDouble: "$footprint" } },
                },
            },
            {
                $sort: { _id: 1 }, // sort by date
            },
        ]);
        // Fill missing days with 0 footprint
        const result = [];
        for (let i = 0; i < 10; i++) {
            const d = new Date();
            d.setDate(today.getDate() - (9 - i));
            const key = d.toISOString().slice(0, 10);

            const found = data.find(item => item._id === key);
            result.push({
                date: key,
                footprint: found ? found.total : 0,
            });
        }

        res.json({ success: true, data: result });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getCategoryPie = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const data = await footPrint.aggregate([
      {
        $match: {
          userId: userId,
          footprint: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: { $toDouble: "$footprint" } },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMonthlyReport = async (req, res) => {
   try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

     const today = new Date();
        const last10Days = new Date();
        last10Days.setDate(today.getDate() - 9)
    // DAILY DATA
     const daily = await footPrint.aggregate([
            {
                $match: {
                    userId: userId,
                    date: { $gte: last10Days, $lte: today },
                    footprint: { $exists: true, $ne: null },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" },
                    },
                    total: { $sum: { $toDouble: "$footprint" } },
                },
            },
            {
                $sort: { _id: 1 }, // sort by date
            },
        ]);
        // Fill missing days with 0 footprint
        const result = [];
        for (let i = 0; i < 10; i++) {
            const d = new Date();
            d.setDate(today.getDate() - (9 - i));
            const key = d.toISOString().slice(0, 10);

            const found = daily.find(item => item._id === key);
            result.push({
                date: key,
                footprint: found ? found.total : 0,
            });
        }

    // TOTAL
    const total = await footPrint.aggregate([
      {
        $match: {
          userId,
          date: { $gte: last30Days },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$footprint" },
        },
      },
    ]);

    // CATEGORY

    const category = await footPrint.aggregate([
      {
        $match: {
          userId: userId,
          footprint: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: { $toDouble: "$footprint" } },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);
    res.json({
      data1daily:result,
      data2category:category,
      total: total[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}