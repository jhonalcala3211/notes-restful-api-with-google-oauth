import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './auth.jwt';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret_key_123',
            signOptions: { expiresIn: '3600s' }
        }),
    ],
    controllers: [AuthController],
    providers: [GoogleStrategy, JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule { }
