import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        if (!request.user) {
            throw new ForbiddenException('User not authenticated');
        }

        console.log('request', request.user)

        if (request.method === 'DELETE' && request.user.role != 'admin') {
            throw new ForbiddenException('Forbidden Access. Admin access only');
        }

        return true;
    }
}

