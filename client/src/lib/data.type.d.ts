interface IPayloadGoogle {
    email: string, image: string, name: string
}
interface CustomResponse<T> {
    message: string | string[],
    statusCode: number,
    data: T,
    error?: string
}

interface UserInfo {
    "id": number,
    "name": string,
    "email": string,
    "phone": string,
    "role": string,
    "image": string
}

interface LoginData {
    access_token: string,
    userInfo: UserInfo
}

interface IPayloadLogin {
    username: string, password: string
}

interface RegisterData {
    "phone": string,
    "fullName": string,
    "email": string,
    "avatar": string,
    "resetPwdToken": string,
    "resetPwdExpire": string,
    "id": number,
    "isVerifiedEmail": boolean,
    "isVerifiedPhone": boolean,
    "type": string,
    "role": string,
    "balance": string,
    "score": number
}

