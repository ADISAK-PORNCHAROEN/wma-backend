import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'เกิดข้อผิดพลาดภายในระบบ' };

    // ✅ ตรวจสอบว่า message เป็น array หรือ string
    let message: string | string[];

    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else if (
      typeof errorResponse === 'object' &&
      Array.isArray((errorResponse as { message?: string[] }).message)
    ) {
      message = (errorResponse as { message: string[] }).message;
    } else {
      message =
        (errorResponse as { message?: string }).message ||
        'เกิดข้อผิดพลาดจากระบบ';
    }

    response.status(status).json({
      statusCode: status,
      message, // ✅ ส่ง array หรือ string ตามจริง
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
