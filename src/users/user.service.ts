import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

   async findOrCreate(profile: any): Promise<User> {
  let user = await this.userModel.findOne({ googleId: profile.id });

  if (!user) {
    // safely get email
    const email = profile.emails?.[0]?.value || `no-email-${profile.id}@example.com`;

    user = new this.userModel({
      googleId: profile.id,
      email,
      name: profile.displayName || 'No Name',
      role: 'user', // default role
    });

    await user.save();
  }

  return user;
}


    async findById(id: string) {
        return this.userModel.findById(id);
    }
}
