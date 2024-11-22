export interface CustomResponse<T> {
    message: string,
    statusCode: number,
    data: T
}

export interface UserInfo {
    "id": number,
    "name": string,
    "email": string,
    "phone": string,
    "role": string,
    "image": string
}

export interface LoginData {
    access_token: string,
    userInfo: UserInfo
}

