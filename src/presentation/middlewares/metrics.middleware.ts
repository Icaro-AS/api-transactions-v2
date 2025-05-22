import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as promBundle from 'express-prom-bundle';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  private readonly promBundleMiddleware: any;

  constructor() {
    this.promBundleMiddleware = promBundle({
      includeMethod: true,
      includePath: true,
      includeStatusCode: true,
      promClient: {
        collectDefaultMetrics: {},
      },
      excludeRoutes: ['/metrics'],
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.promBundleMiddleware(req, res, next);
  }
}
