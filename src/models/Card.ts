import { Schema, model, models } from 'mongoose';

const CardSchema = new Schema(
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
    authorId: String,
  },
  { timestamps: true },
);

export default models.Card || model('Card', CardSchema);
