import mongoose, { Document, Schema } from 'mongoose';
import { encrypt, decrypt } from '../utils/aes';

export interface TopicContentDocument extends Document {
  deponent: string;
  content: string;
  fromTime: string;
  toTime: string;
  score: number;
}

const TopicContentSchema = new Schema({
  deponent: {
    type: String,
    required: true,
    get: decrypt,
    set: encrypt,
  },
  content: {
    type: String,
    required: true,
    get: decrypt,
    set: encrypt,
  },
  fromTime: {
    type: String,
    required: true,
    get: decrypt,
    set: encrypt,
  },
  toTime: {
    type: String,
    required: true,
    get: decrypt,
    set: encrypt,
  },
  score: {
    type: String,
    required: true,
    get: (value: string) => parseFloat(decrypt(value)),
    set: (value: number) => encrypt(value.toString()),
  },
});

export const TopicContent = mongoose.models.TopicContent || mongoose.model<TopicContentDocument>('TopicContent', TopicContentSchema);
