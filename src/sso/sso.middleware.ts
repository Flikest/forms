import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify, sign } from 'jsonwebtoken'

@Injectable()
export class SsoMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers["authorization"];
      const refreshToken = req.headers["refreshToken-authorization"];

      if (!refreshToken || !accessToken) {
        return res.redirect('/sso/login');
      }

      const verifyRefresh = verify(refreshToken, process.env.REFRESH_SECRET);
      const verifyAccess = verify(accessToken, process.env.ACCESS_SECRET);

      const now = Date.now();

      if (
        verifyRefresh["expiresIn"] > now && verifyAccess["expiresIn"] < now
      ) {
        const newRefreshToken: string = await sign(
          { id: verifyRefresh["id"] },
          process.env.REFRESH_SECRET,
          { expiresIn: '168h' }
        );

        const newAccessToken: string = await sign(
          { id: verifyAccess["id"] },
          process.env.ACCESS_SECRET,
          { expiresIn: '30m' }
        );

        res.cookie("y-forms-RefreshToken", newRefreshToken, { httpOnly: true });
        res.cookie("y-forms-AccessToken", newAccessToken, { httpOnly: true });
        return next();
      } else {
        return res.redirect('/sso/login');
      }
    } catch (err) {
      console.error('error witn Ssomiddleware:', err);
      return res.redirect('/login');
    }
  }
}
