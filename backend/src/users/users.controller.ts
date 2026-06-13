import { Controller, Get, Post, Patch, Delete, Body, Param, Request, UseGuards, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Request() req: any) {
    const { password, ...user } = req.user;
    return user;
  }

  @Patch('me')
  async updateProfile(@Request() req: any, @Body() body: { name?: string }) {
    return this.usersService.updateProfile(req.user._id, body);
  }

  @Patch('me/password')
  async changePassword(@Request() req: any, @Body() body: { currentPassword: string; newPassword: string }) {
    await this.usersService.changePassword(req.user._id, body.currentPassword, body.newPassword);
    return { message: 'Contraseña actualizada correctamente' };
  }

  @Get('alumnos')
  async getAlumnos(@Request() req: any) {
    if (req.user.rol !== 'profesor') return [];
    return this.usersService.getAlumnosWithProgress();
  }

  @Post('alumnos')
  async createAlumno(@Request() req: any, @Body() body: { name: string; email: string; password: string }) {
    if (req.user.rol !== 'profesor') throw new ForbiddenException();
    return this.usersService.createAlumno(body.name, body.email, body.password);
  }

  @Delete('alumnos/:id')
  async deleteAlumno(@Request() req: any, @Param('id') id: string) {
    if (req.user.rol !== 'profesor') throw new ForbiddenException();
    await this.usersService.deleteAlumno(id);
    return { message: 'Alumno eliminado' };
  }

  @Get()
  async findAll(@Request() req: any) {
    if (req.user.rol !== 'profesor') return [];
    return this.usersService.findAll();
  }
}
