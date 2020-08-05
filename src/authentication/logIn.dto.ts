import { IsString } from 'class-validator';

class LogInDto {
    @IsString()
    public name: string;

    @IsString()
    public password: string;
}

export default LogInDto;