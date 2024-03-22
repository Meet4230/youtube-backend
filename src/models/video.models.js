import { mongoose, Schema } from "mongoose";
import mongooseAggregatepaginate from "mongoose-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //Cloudnary URL
      required: true,
    },
    thumbnail: {
      type: String, //Cloudnary URL
      required: true,
    },
    title: {
      type: String, //Cloudnary URL
      required: true,
    },
    description: {
      type: String, //Cloudnary URL
      required: true,
    },
    duration: {
      type: Number, //Cloudnary URL
      required: true,
    },
    views: {
      type: Number, //Cloudnary URL
      required: true,
    },
    isPublished: {
      type: Boolean, //Cloudnary URL
      required: true,
    },
    Owner: {
      type: Schema.Types.ObjectId, //Cloudnary URL
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
videoSchema.plugin(mongooseAggregatepaginate);

export const Video = mongoose.model("Video", videoSchema);
