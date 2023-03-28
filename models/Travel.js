const mongoose = require("mongoose");
const travelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "travel ner orul!"],
  },
  images: {
    type: String,
    required: [true, "url oruul!"],
  },
  detail: {
    type: String,
    maxlength: [500, "hmgin ihde 500!"],
  },
  price: Number,
  location: {
    type: String,
  },
  day: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const travel = mongoose.model("Travel", travelSchema);
module.exports = travel;
