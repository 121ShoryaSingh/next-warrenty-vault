import mongoose, { Model, Schema, Types } from 'mongoose';

export interface IRecept {
  url: string;
  key: string;
}
export interface IItem extends Document {
  owner: Types.ObjectId;
  title: string;
  category: string;
  purchaseDate: Date;
  warrentyExpiry: Date;
  price: number;
  recepts: IRecept[];
  notes?: string;
}

export const ItemSchema: Schema<IItem> = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    warrentyExpiry: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    recepts: [
      {
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default (mongoose.models.Item as Model<IItem>) ||
  mongoose.model<IItem>('Item', ItemSchema);
