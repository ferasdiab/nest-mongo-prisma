// validation.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Perform validation logic here
    const { body } = req;
    const arr = Object.keys(body);
    const isValid = /* Your validation logic */ true;

    if (!arr.length) {
      return res.status(200).json({ ok: false, message: 'Validation failed' });
    }

    // Add extra data to the request object
    req['extraData'] = { someKey: 'someValue' };

    next();
  }
}
