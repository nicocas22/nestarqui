import { ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  port: parseInt(process.env.PORT) || 3000,
  name: process.env.NAME || 'nest-app',
  Jwt: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: true,
    secretOrKey: process.env.JWT_SECRET,
  },
};
