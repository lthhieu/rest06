import axios from '@/configs/axios.custom'

export const apiLoginWithGoogle = (payload: IPayloadGoogle) => {
    return axios.post('/api/v1/auth/login-with-google', payload)
}