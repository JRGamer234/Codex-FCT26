import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { ProgressService } from '../progress/progress.service';

const TOTAL_LESSONS = 7;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly progressService: ProgressService,
  ) {}

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

  async getAlumnosWithProgress(): Promise<any[]> {
    const alumnos = await this.userModel.find({ rol: 'alumno' }).select('-password').exec();
    return Promise.all(alumnos.map(async alumno => {
      const stats = await this.progressService.getUserStats(alumno._id.toString());
      return {
        name: alumno.name,
        email: alumno.email,
        completedLessons: stats.completedLessons,
        progress: Math.min(100, Math.round((stats.completedLessons / TOTAL_LESSONS) * 100)),
      };
    }));
  }

  async updateProfile(id: string, updates: Partial<{ name: string }>): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, updates, { new: true }).select('-password').exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async createAlumno(name: string, email: string, password: string): Promise<Omit<UserDocument, 'password'>> {
    const existing = await this.userModel.findOne({ email }).exec();
    if (existing) throw new ConflictException('Ya existe un usuario con ese email');
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ name, email, password: hashed, rol: 'alumno' });
    const { password: _, ...result } = user.toObject();
    return result as any;
  }
}
