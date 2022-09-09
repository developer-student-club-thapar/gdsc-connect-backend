import { ConsoleLogger, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        console.log('err', err);
        console.log('user', user);
        console.log('info', info);
        console.log('status', status);
        return user;
    }
}