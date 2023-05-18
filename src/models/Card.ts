import { Model, Schema, Types, model, models } from 'mongoose';

interface ICard {
  type: number;
  title: string;
  description: string;
  stars: number;
  question: string;
  solution: string;
  solutionText: string;
  luckType: string;
  imgUrl: string;
  starsCalcType: number;
  authorId: Types.ObjectId;
}

const CardSchema = new Schema<ICard>(
  {
    type: Number,
    title: String,
    description: String,
    stars: Number,
    question: String,
    solution: String,
    solutionText: String,
    luckType: String,
    imgUrl: String,
    starsCalcType: Number,
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default (models.Card ||
  model<ICard>('Card', CardSchema)) as Model<ICard>;
