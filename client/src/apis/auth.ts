import axios from '@/configs/axios.custom'

export const apiLoginWithGoogle = (payload: IPayloadGoogle) => {
    return axios.post<any, CustomResponse<LoginData>>('/api/v1/auth/login-with-google', payload)
}

export const apiLogin = (payload: IPayloadLogin) => {
    return axios.post<any, CustomResponse<LoginData>>('/api/v1/auth/login', payload)
}