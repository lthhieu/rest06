import axios from '@/configs/axios.custom'
import { CustomResponse } from '@/configs/data.type'

export const apiLoginWithGoogle = (payload: IPayloadGoogle) => {
    return axios.post<any, CustomResponse>('/api/v1/auth/login-with-google', payload)
}