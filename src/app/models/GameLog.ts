import { Model, Schema, Types, model, models } from 'mongoose';

interface IGameLog {
  winnerName: string;
  winnerScore: number;
  startedAt: Date;
  endAt: Date;
  ownerName: string;
  ownerId: Types.ObjectId;
}

const GameLogSchema = new Schema<IGameLog>(
  {
    winnerName: String,
    winnerScore: Number,
    startedAt: Date,
    endAt: Date,
    ownerName: String,
    ownerId: { type: Schema.Types.ObjectId, ref: 'Player' },
  },
  { timestamps: false },
);

export default (models.GameLog ||
  model<IGameLog>('GameLog', GameLogSchema)) as Model<IGameLog>;
