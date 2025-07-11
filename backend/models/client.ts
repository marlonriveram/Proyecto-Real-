import { model, Schema, Types } from "mongoose";

const clientSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true },
    document_type: { type: String, required: true },
    document_value: { type: String, required: true },
    sales: {
        type: {
            count: Number,
            amount: Number,
        }
    },
    // user: { type: Types.ObjectId, ref: "Sale" }
})

// nota: tercer parametro es el nombre de la tabla en la db
const clientModel = model("Client", clientSchema, "clients") // modelo
export default clientModel