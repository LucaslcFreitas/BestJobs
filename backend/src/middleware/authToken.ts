import { Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export function verifyJWT(
    request: Request,
    response: Response,
    next: () => void
) {
    const bearerHeader = request.headers['authorization'];

    if (typeof bearerHeader == 'undefined') {
        return response.status(401).json({ error: 'Invalid token' });
    }

    const bearer = bearerHeader.split(' ');
    const token: string = bearer[1];

    const jwt_secrete: string = process.env.JWT_SECRET!;

    verify(token, jwt_secrete, (error, decode) => {
        if (error) return response.status(401).json({ error: 'Invalid token' });

        if (isAnJwtPayload(decode)) request.auth_user_id = decode.id;
        next();
    });
}

// prettier-ignore
function isAnJwtPayload(obj: any): obj is JwtPayload { // eslint-disable-line @typescript-eslint/no-explicit-any
    return 'id' in obj;
}
