import { IsNotEmpty } from "class-validator";

export class AuthDataGoogleDto {
    @IsNotEmpty({ message: 'Tên không được để trống' })
    name: string;
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;
    @IsNotEmpty({ message: 'Ảnh không được để trống' })
    image: string;
}
