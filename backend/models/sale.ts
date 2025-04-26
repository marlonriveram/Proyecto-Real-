import { model, Schema, Types } from "mongoose";


const saleSchema = new Schema({
    operation_date:Date,
    total_amount:Number,
    user: {type:Types.ObjectId, ref:"User"} // con esto se referencia a otra collección
})

// nota: tercer parametro es el nombre de la tabla en la db
const SaleModel = model("Sale", saleSchema,"ventas") // modelo 

export default SaleModel