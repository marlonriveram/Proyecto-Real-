import { model, Schema } from "mongoose";

const userSchema = new Schema({
    firstname:{type: String, require:true},
    lastname:{type: String, require:true},
    email:{ type: String, unique:true },
    login_code:{type: String, length: 6 },
    role:{type:{
        admin:Boolean,
        seller:Boolean
    },require:true}
})

// nota: tercer parametro es el nombre de la tabla en la db
export default model("User", userSchema,"usuarios") // modelo 