import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async create(name: string, email: string, hashedPassword: string, rol = 'alumno'): Promise<UserDocument> {
    return this.userModel.create({ name, email, password: hashedPassword, rol });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password').exec();
  }

  async updateProfile(id: string, updates: Partial<{ name: string }>): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, updates, { new: true }).select('-password').exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
