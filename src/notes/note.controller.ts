import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './note.service';
import { AuthGuard } from '@nestjs/passport';
import { Query } from '@nestjs/common';
import { RolesGuard } from '../auth/auth.role.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('api/notes')
export class NotesController {
  constructor(private notesService: NotesService) { }

  @Post()
  create(@Req() req, @Body() data) {
    return this.notesService.create(req.user.sub, data);
  }

  @Get()
  async findAll(@Req() req, @Query('page') page: number, @Query('limit') limit: number) {
    const userId = req.user.sub;
    return this.notesService.findAll(userId, Number(page) || 1, Number(limit) || 5);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.notesService.findOne(req.user.sub, id);
  }

  @Put(':id')
  update(@Req() req, @Param('id') id: string, @Body() data) {
    return this.notesService.update(req.user.sub, id, data);
  }

  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.notesService.remove(req.user.sub, id);
  }

}
