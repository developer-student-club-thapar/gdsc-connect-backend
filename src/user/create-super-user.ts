// create super user
import { createInterface } from 'readline';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';

// input user data
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// user schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  password: {
    type: String,
  },

  role: {
    type: String,
  },
});

function input(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  const mongodb_url = process.env.MONGO_URL;
  await mongoose.connect(mongodb_url);

  const email = await input('What is your email? ');
  const password = await input('What is your password? ');
  const first_name = await input('What is your first name? ');
  const last_name = await input('What is your last name? ');

  rl.close();

  // check if user already exists
  const checkUser = await mongoose.model('User', UserSchema).findOne({ email });
  if (checkUser) {
    console.log('User already exists');
    process.exit(0);
  }

  // create user
  const user = {
    email,
    password: await hash(password, 10),
    first_name,
    last_name,
    role: 'super',
  };

  // add user to users collection
  await mongoose
    .model('Users', UserSchema)
    .create(user)
    .then(() => {
      console.log('User created successfully');
      process.exit(0);
    });
}

main();
