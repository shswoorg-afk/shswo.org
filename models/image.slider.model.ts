import mongoose, { Schema} from "mongoose";
const imageSliderSchema = new Schema({
"imageUrl" : {
    type : String,
    required : true,
},
"imageText" : {
    type : String,
    required : true,
}
});
export const imageSliderModel = mongoose.model("ImageSlider", imageSliderSchema);