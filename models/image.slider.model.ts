import { Schema, type SchemaOptions } from "mongoose";
const imageSliderSchema = new Schema({
"imageUrl" : {
    type : String,
    required : true,
},
"textonImage" : {
    type : String,
    required : true,
}
})