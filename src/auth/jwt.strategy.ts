import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/types/jwtPayload';
import { RequestUser } from 'src/types/requestUser';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    //NOTE: 親クラスのコンストラクタに設定を追加することで、リクエストからJWTを取得し、JWTの検証処理が行われる
    super({
      //NOTE: リクエストに含まれるJWTの格納場所を指定する
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  //NOTE: passportストラテジーでは親クラスのコンストラクタによる検証を通過した場合、validateメソッドが呼び出される
  //NOTE: jwttokenではjwtpayloadを受け取る
  validate(payload: JwtPayload): RequestUser {
    return {
      id: payload.sub,
      name: payload.username,
      status: payload.status,
    };
  }
}
