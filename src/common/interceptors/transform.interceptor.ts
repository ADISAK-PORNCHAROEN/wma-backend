import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const method = request.method;
    const autoMessage = this.getAutoMessage(method);

    return next.handle().pipe(
      map((data) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // ✅ กรณี data เป็น object ที่มี statusCode
        const statusCode =
          (data as any)?.statusCode || response.statusCode || HttpStatus.OK;

        // ✅ ดึง message จากใน data.data.message หรือ data.message
        const innerMessage =
          (data as any)?.data?.message || (data as any)?.message || autoMessage;

        // ✅ ดึง data จริง (ไม่รวม metadata)
        const innerData =
          typeof data === 'object' && data !== null && 'data' in data
            ? (data as any).data
            : data;

        return {
          statusCode,
          message: innerMessage,
          data: innerData,
          timestamp: new Date().toISOString(),
          path: request.url,
          responseTime: `${responseTime} ms`,
        };
      }),
    );
  }

  private getAutoMessage(method: string): string {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'ดึงข้อมูลสำเร็จ';
      case 'POST':
        return 'เพิ่มข้อมูลสำเร็จ';
      case 'PUT':
      case 'PATCH':
        return 'อัปเดตข้อมูลสำเร็จ';
      case 'DELETE':
        return 'ลบข้อมูลสำเร็จ';
      default:
        return 'ดำเนินการสำเร็จ';
    }
  }
}
