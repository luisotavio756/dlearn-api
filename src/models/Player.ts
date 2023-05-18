/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt';
import { Model, Schema, model, models } from 'mongoose';

interface IPlayer {
  nickname: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IPlayerMethods {
  validatePassword(password: string): Promise<boolean>;
}

type PlayerModel = Model<IPlayer, {}, IPlayerMethods>;

const PlayerSchema = new Schema<IPlayer, PlayerModel, IPlayerMethods>(
  {
    nickname: String,
    password: String,
  },
  { timestamps: true },
);

PlayerSchema.pre('save', async function save(next) {
  this.password = await bcrypt.hash(this.password, 8);

  return next();
});

PlayerSchema.method(
  'validatePassword',
  async function validatePassword(data: string) {
    return bcrypt.compare(data, this.password);
  },
);

export default (models.Player ||
  model<IPlayer, PlayerModel>('Player', PlayerSchema)) as PlayerModel;
