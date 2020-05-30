import mongoose from "mongoose";

const EmoteSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

export const Emote = mongoose.model("emotes", EmoteSchema);