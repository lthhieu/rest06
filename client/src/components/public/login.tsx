import { Input } from "@/components/ui/input"
import appLogo from '@/assets/logo.svg'
import loginLogo from '@/assets/login.png'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import InputPassword from "@/components/ui/input-password"
const Login = () => {
    const formSchema = z.object({
        emailOrPhone: z.string().min(1, 'Tên đăng nhập không được để trống'),
        password: z.string().min(1, 'Mật khẩu không được để trống'),
    })
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailOrPhone: '',
            password: ''
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
                <div className="p-8 flex justify-center flex-col h-full min-h-[650px]">
                    <div>
                        <h5 className="text-base font-medium text-[#2c2c2c]">Xin chào bạn</h5>
                        <h3 className="mt-1 mb-6 text-2xl font-medium text-[#2c2c2c] tracking-tighter">Đăng nhập để tiếp tục</h3>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="emailOrPhone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email hoặc Số điện thoại</FormLabel>
                                            <FormControl>
                                                <Input className="focus-visible:ring-[#ffeceb]" placeholder="Nhập tên đăng nhập" {...field} />
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
                                                <InputPassword className="focus-visible:ring-[#ffeceb]" placeholder="Nhập mật khẩu" {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
export default Login