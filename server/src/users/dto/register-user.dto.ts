import { IsNotEmpty } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    phone: string;
}
