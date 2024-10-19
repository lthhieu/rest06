import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import appLogo from '@/assets/logo.svg'
import loginLogo from '@/assets/login.png'
const Login = () => {
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
            <div className="col-span-6">login</div>
        </div>
    )
}
export default Login