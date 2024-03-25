import { mongoose, Schema } from "mongoose"

const subscriptonSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // one who is Subscribing
      ref: User,
    },
    channel: {
      type: Schema.Types.ObjectId, // one to whom subscriber is Subscribing
      ref: User,
    },
  },
  { timestamps: true }
)

export const Subscription = mongoose.model("Subscription", subscriptonSchema)
