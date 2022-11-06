import { RegisterUserDto } from './dto/register-user.dto';

const user = new RegisterUserDto();

user.email = '';
user.password = '';
user.invite_code = '';
user.bio = '';
user.first_name = '';
user.last_name = '';
user.graduation_batch = 0;
user.gender = '';
user.profile_picture = '';
user.resume = '';
user.socials = {
  facebook: '',
  instagram: '',
  linkedin: '',
  twitter: '',
  github: '',
};

console.log(user);
