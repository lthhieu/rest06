import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeNames, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDataGoogleDto } from 'src/auth/dto/auth-data-google.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { fullName } = createUserDto
    const user = this.usersRepository.create({ fullName });
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Omit<User, "password"> | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException(`Không tìm thấy user với id = ${id}`)
    const { password, ...result } = user
    return result
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findOneByPhone(phone: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ phone });
  }

  async createWithGoogle(data: AuthDataGoogleDto): Promise<User | null> {
    const { email, image, name } = data
    const newUser = this.usersRepository.create({ email, fullName: name, avatar: image, type: TypeNames.GOOGLE });
    return this.usersRepository.save(newUser);
  }

  hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
  }

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const { phone } = registerUserDto
    const checkUser = await this.findOneByPhone(phone)
    if (checkUser) {
      throw new ConflictException(`Số điện thoại ${phone} đã được đăng ký.`);
    }
    const user = this.usersRepository.create({ fullName: phone, phone, password: await this.hashPassword('123456') });
    const saveUser = await this.usersRepository.save(user);
    if (!saveUser) throw new BadRequestException(`Không thể lưu thông tin người dùng!`)
    const { password, ...result } = saveUser
    return result
  }

  updateRefreshToken = async (token: string, id: number) => {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException(`Không tìm thấy user với id = ${id}`)
    return await this.usersRepository.update(id, { refreshToken: token })
  }
}
