import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from 'src/libs/common/api-response';
import { Code } from 'src/libs/common/code';
import { Exception } from 'src/libs/common/exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  public catch(error: Error, host: ArgumentsHost): void {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();

    let errorResponse: ApiResponse<unknown> = ApiResponse.error(Code.INTERNAL_ERROR.code, error.message);

    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);

    const message: string =
      `Method: ${request.method}; ` +
      `Path: ${request.path}; ` +
      `Error: ${errorResponse.message}`;

    Logger.error(message);

    response.json(errorResponse);
  }

  private handleNestError(error: Error, errorResponse: ApiResponse<unknown>): ApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = ApiResponse.error(error.getStatus(), error.message, null);
    }
    if (error instanceof UnauthorizedException) {
      errorResponse = ApiResponse.error(Code.UNAUTHORIZED_ERROR.code, Code.UNAUTHORIZED_ERROR.message, null);
    }

    return errorResponse;
  }

  private handleCoreException(error: Error, errorResponse: ApiResponse<unknown>): ApiResponse<unknown> {
    if (error instanceof Exception) {
      errorResponse = ApiResponse.error(error.code, error.message, error.data);
    }

    return errorResponse;
  }

}
