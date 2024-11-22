import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import InputPassword from "@/components/ui/input-password"
import { toast } from "sonner"
import { apiLogin } from "@/apis/auth"
const LoginForm = ({ setOpen }: { setOpen: (v: boolean) => void }) => {
    const formSchemaLogin = z.object({
        emailOrPhone: z.string().min(1, 'Tên đăng nhập không được để trống'),
        password: z.string().min(1, 'Mật khẩu không được để trống'),
    })
    // 1. Define your form.
    const formLogin = useForm<z.infer<typeof formSchemaLogin>>({
        resolver: zodResolver(formSchemaLogin),
        defaultValues: {
            emailOrPhone: '',
            password: ''
        },
    })
    const onSubmitLogin = async (values: z.infer<typeof formSchemaLogin>) => {
        const res = await apiLogin({ username: values.emailOrPhone, password: values.password })
        if (res && res.data) {
            toast.success(res.message);
            setOpen(false)
        } else {
            toast.error(res.message);
        }
    }
    return (
        <Form {...formLogin}>
            <form onSubmit={formLogin.handleSubmit(onSubmitLogin)} className="space-y-4">
                <FormField
                    control={formLogin.control}
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
                    control={formLogin.control}
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
                    )} />
                <Button size={"lg"} variant={"destructive"} className="w-full" type="submit">Đăng nhập</Button>
            </form>
        </Form>
    )
}
export default LoginForm