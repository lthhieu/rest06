import appLogo from '@/assets/logo.svg'
import loginLogo from '@/assets/login.png'
import { Button } from "@/components/ui/button"
import logoGoogle from '@/assets/google.svg'
import { useEffect, useState } from "react"
import LoginForm from "@/components/public/login-form"
import RegisterForm from "@/components/public/register-form"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { apiLoginWithGoogle } from '@/apis/auth'
type loginType = {
    isSignIn: boolean,
    setOpen: (v: boolean) => void
}

type googleType = {
    email: string,
    email_verified: boolean,
    family_name: string,
    given_name: string,
    name: string,
    picture: string,
    sub: string,
}

const LoginOrRegister = (props: loginType) => {
    const [isSignIn, setIsSignIn] = useState<string>('SignIn')
    const { setOpen } = props
    useEffect(() => {
        if (props.isSignIn === true) {
            setIsSignIn('SignIn')
        } else {
            setIsSignIn('SignUp')
        }
    }, [])
    const login = useGoogleLogin({
        onSuccess: async response => {
            const token = response.access_token;
            // fetching userinfo can be done on the client or the server
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    })
            if (userInfo.status === 200) {
                const result: googleType = userInfo.data;
                const payload: IPayloadGoogle = {
                    email: result.email, image: result.picture, name: result.name
                }
                const res = await apiLoginWithGoogle(payload)
                console.log(res.data.userInfo.role)
                // contains name, email & googleId(sub)
                setOpen(false)
            }
        },
    });
    return (
        <div className="grid grid-cols-10">
            <div className="col-span-4 bg-[#ffeceb] rounded-tl-[8px] rounded-bl-[8px] pt-8 flex flex-col">
                <img className='ml-8 w-40' src={appLogo} alt="App logo" />
                <div className="flex items-center flex-1">
                    <div className="flex flex-col pl-6">
                        <img className='mt-[-75px] mb-3' src={loginLogo} alt="Login logo" />
                        <h4 className="text-lg font-medium tracking-tighter text-[#2c2c2c]">Tìm nhà đất</h4>
                        <h4 className="text-lg font-medium tracking-tighter text-[#2c2c2c]">Batdongsan.com.vn dẫn lối</h4>
                    </div>
                </div>
            </div>
            <div className="col-span-6">
                <div className="p-8 flex justify-center flex-col h-full min-h-[550px]">
                    <div>
                        <h5 className="text-base font-medium text-[#2c2c2c]">Xin chào bạn</h5>
                        <h3 className="mt-1 mb-6 text-2xl font-medium text-[#2c2c2c] tracking-tighter">{isSignIn === 'SignIn' ? 'Đăng nhập để tiếp tục' : 'Đăng ký tài khoản mới'}</h3>
                        {isSignIn === 'SignIn' ?
                            <LoginForm setOpen={setOpen} />
                            :
                            <RegisterForm setOpen={setOpen} />
                        }
                    </div>
                    <div className="relative w-full flex items-center justify-center mt-5 mb-4">
                        <div className="w-full h-[1px] bg-[#f1f1f1]"></div>
                        <div className="absolute bg-[#fff] px-2 py-1"><span className="text-[#999] text-sm font-normal font-[roboto]">Hoặc</span></div>
                    </div>
                    <div className="w-full mt-2">
                        <Button onClick={() => login()} className="w-full" variant={"outline"} size={"lg"}>
                            <div className="flex items-center justify-center gap-2">
                                <img src={logoGoogle} alt="Logo Google" width={18} height={18} />
                                <span className="text-[#2c2c2c]">Đăng nhập với Google</span>
                            </div>
                        </Button>
                    </div>
                    <div className="mt-6 text-center text-[#999999] text-[12px] font-[roboto] font-normal">
                        Bằng việc tiếp tục, bạn đồng ý với <span className="text-[#e03c31]">Điều khoản sử dụng, Chính sách bảo mật, Quy chế, Chính sách</span> của chúng tôi.
                    </div>
                    <div className="mt-6 text-center">
                        {isSignIn === 'SignIn' ? <div className="font-[roboto] font-normal text-sm text-[#2c2c2c]">
                            Chưa là thành viên? <span onClick={() => { setIsSignIn('SignUp') }} className="text-[#e03c31] cursor-pointer font-medium">Đăng ký</span> tại đây
                        </div> : <div className="font-[roboto] font-normal text-sm text-[#2c2c2c]">
                            Đã có tài khoản? <span onClick={() => { setIsSignIn('SignIn') }} className="text-[#e03c31] cursor-pointer font-medium">Đăng nhập</span> tại đây
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginOrRegister