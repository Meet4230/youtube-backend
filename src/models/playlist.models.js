import { mongoose, Schema } from "mongoose"
import mongooseAggregatepaginate from "mongoose-paginate-v2"

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

playlistSchema.plugin(mongooseAggregatepaginate)

export const Playlist = mongoose.model("Playlist", playlistSchema)
