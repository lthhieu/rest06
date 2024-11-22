import axios from '@/configs/axios.custom'

export const apiRegisterNewUser = ({ phone }: { phone: string }) => {
    return axios.post<any, CustomResponse<RegisterData>>('/api/v1/users/register', { phone })
}
