/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt';
import { Model, Schema, model, models } from 'mongoose';

interface IUser {
  name: string;
  login: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  validatePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: String,
    login: String,
    password: String,
  },
  { timestamps: true },
);

UserSchema.pre('save', async function save(next) {
  this.password = await bcrypt.hash(this.password, 8);

  return next();
});

UserSchema.method(
  'validatePassword',
  async function validatePassword(data: string) {
    return bcrypt.compare(data, this.password);
  },
);

export default (models.User ||
  model<IUser, UserModel>('User', UserSchema)) as UserModel;
