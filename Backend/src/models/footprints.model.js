import mongoose from "mongoose";

const footprintModel = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    category: { type: String, enum: ['Transport', 'Electricity', 'Food' , 'Water' , 'Waste' , 'Shopping'], required: true },
    subcategory: { type: String, required: true },
    amount: { type: Number, required: true },
    footprint: { type: Number, required: true }, // calculated carbon footprint
    date: { type: Date, required: true }
})

const footPrint = mongoose.model("footPrint", footprintModel)

export {footPrint}