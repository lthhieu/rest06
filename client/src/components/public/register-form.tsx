import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { apiRegisterNewUser } from "@/apis/users"
import { toast } from "sonner"

const RegisterForm = ({ setOpen }: { setOpen: (v: boolean) => void }) => {
    const formSchemaRegister = z.object({
        phoneNumber: z.string().min(1, 'Số điện thoại không được để trống')
    })
    // 1. Define your form.
    const formRegister = useForm<z.infer<typeof formSchemaRegister>>({
        resolver: zodResolver(formSchemaRegister),
        defaultValues: {
            phoneNumber: ''
        },
    })
    const onSubmitRegister = async (values: z.infer<typeof formSchemaRegister>) => {
        const res = await apiRegisterNewUser({ phone: values.phoneNumber })
        if (res && res.data) {
            toast.success(res.message);
            setOpen(false)
        } else {
            toast.error(res.message);
        }
    }
    return (
        <Form {...formRegister}>
            <form onSubmit={formRegister.handleSubmit(onSubmitRegister)} className="space-y-4">
                <FormField
                    control={formRegister.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Input className="focus-visible:ring-[#ffeceb]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button size={"lg"} variant={"destructive"} className="w-full" type="submit">Tiếp tục</Button>
            </form>
        </Form>
    )
}
export default RegisterForm