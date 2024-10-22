import { Input } from "@/components/ui/input"
import appLogo from '@/assets/logo.svg'
import loginLogo from '@/assets/login.png'
import { boolean, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import InputPassword from "@/components/ui/input-password"
import logoGoogle from '@/assets/google.svg'
import { useEffect, useState } from "react"
type loginType = {
    isSignIn?: boolean
}
const Login = (props: loginType) => {
    const [isSignIn, setIsSignIn] = useState<string>('SignIn')
    useEffect(() => {
        if (props?.isSignIn == undefined) {
            setIsSignIn('SignIn')
        } else {
            setIsSignIn('SignUp')
        }
    }, [])
    const formSchema = z.object({
        emailOrPhone: z.string().min(1, 'Tên đăng nhập không được để trống'),
        password: z.string().min(1, 'Mật khẩu không được để trống'),
        phoneRegister: z.string().min(1, 'Số điện thoại không được để trống'),
    })
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailOrPhone: '',
            password: '',
            phoneRegister: ''
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {isSignIn === 'SignIn' ?
                                    <><FormField
                                        control={form.control}
                                        name="emailOrPhone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email hoặc Số điện thoại</FormLabel>
                                                <FormControl>
                                                    <Input className="focus-visible:ring-[#ffeceb]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mật khẩu</FormLabel>
                                                    <FormControl>
                                                        <InputPassword className="focus-visible:ring-[#ffeceb]" {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /></> : <FormField
                                        control={form.control}
                                        name="phoneRegister"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Số điện thoại</FormLabel>
                                                <FormControl>
                                                    <Input className="focus-visible:ring-[#ffeceb]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />}
                                <Button size={"lg"} variant={"destructive"} className="w-full" type="submit">{isSignIn === 'SignIn' ? 'Đăng nhập' : 'Tiếp tục'}</Button>
                            </form>
                        </Form>
                    </div>
                    <div className="relative w-full flex items-center justify-center mt-5 mb-4">
                        <div className="w-full h-[1px] bg-[#f1f1f1]"></div>
                        <div className="absolute bg-[#fff] px-2 py-1"><span className="text-[#999] text-sm font-normal font-[roboto]">Hoặc</span></div>
                    </div>
                    <div className="w-full mt-2">
                        <Button className="w-full" variant={"outline"} size={"lg"}>
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
                            Chưa là thành viên? <span onClick={() => { setIsSignIn('SignUp'); form.reset() }} className="text-[#e03c31] cursor-pointer font-medium">Đăng ký</span> tại đây
                        </div> : <div className="font-[roboto] font-normal text-sm text-[#2c2c2c]">
                            Đã có tài khoản? <span onClick={() => { setIsSignIn('SignIn'); form.reset() }} className="text-[#e03c31] cursor-pointer font-medium">Đăng nhập</span> tại đây
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login