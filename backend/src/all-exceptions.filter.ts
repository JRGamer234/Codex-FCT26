import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('GlobalException');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // 🔥 LOG REAL DEL ERROR
    this.logger.error(
      `Status: ${status} | Message: ${JSON.stringify(message)}`,
      exception?.stack,
    );

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
    });
  }
}