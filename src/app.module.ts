import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { NotesModule } from './notes/note.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes env vars available everywhere
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    AuthModule,
    UsersModule,
    NotesModule,
  ],
})
export class AppModule { }
