import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify, sign } from 'jsonwebtoken'

@Injectable()
export class SsoMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers["Authorization"];
    const refreshToken = req.cookies["Authorization"];

    const verifyRefresh = verify(refreshToken, process.env.REFRESH_SECRET);
    const verifyAccess = verify(accessToken, process.env.ACCESS_SECRET);

    if (verifyRefresh["expiresIn"] > Date.now && verifyAccess["expiresIn"] < Date.now){
        const newRefreshToken: string = await sign(
          {id: verifyRefresh["id"]},
          process.env.REFRESH_SECRET,
          {expiresIn: '168h'}, 
        ); 

        const newAccessToken: string = await sign(
          {id: verifyAccess["id"]},
          process.env.ACCESS_SECRET,
          {expiresIn: '30min'},
        );

        res.cookie("y-forms-RefreshToken", newRefreshToken, {httpOnly: true})
        res.cookie("y-forms-AccessToken", newAccessToken, {httpOnly: true})
        next();
    }else{
      // редирект на сраницу авторизации
      // у меня нету данной страницы, по этому расчитывается что вы запустили приложение через npm run start:prod
      res.redirect("http://localhost:8080/login/")
    }
  }
}
