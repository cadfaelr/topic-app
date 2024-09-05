import mongoose, { Document, Schema } from 'mongoose';
import { encrypt, decrypt } from '../utils/aes';
import { TopicContentDocument } from './TopicContent';

export interface TopicDocument extends Document {
  topic: string;
  topicContents: TopicContentDocument[];
}

const TopicSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      get: decrypt,
      set: encrypt,
    },
    topicContents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'TopicContent',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Topic = mongoose.models.Topic || mongoose.model<TopicDocument>('Topic', TopicSchema);
