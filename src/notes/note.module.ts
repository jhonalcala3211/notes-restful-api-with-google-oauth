import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './note.schema';
import { NotesService } from './note.service';
import { NotesController } from './note.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret_key_123',
    }),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
