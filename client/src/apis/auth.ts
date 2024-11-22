import axios from '@/configs/axios.custom'
import { CustomResponse, LoginData } from '@/configs/data.type'

export const apiLoginWithGoogle = (payload: IPayloadGoogle) => {
    return axios.post<any, CustomResponse<LoginData>>('/api/v1/auth/login-with-google', payload)
}