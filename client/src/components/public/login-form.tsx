import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import InputPassword from "@/components/ui/input-password"
import { toast } from "sonner"
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
    const onSubmitLogin = (values: z.infer<typeof formSchemaLogin>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                <Button size={"lg"} variant={"destructive"} className="w-full" type="button" onClick={() => { toast.success('My success toast'); setOpen(false) }}>Đăng nhập</Button>
            </form>
        </Form>
    )
}
export default LoginForm