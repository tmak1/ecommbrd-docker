import { hashPassword } from '../../shared/utils/bcryptHelper.js';
import randomMC from 'random-material-color';

const users = [
  //--- 0
  {
    name: 'Admin User1',
    email: 'dt1@ga.co.uk',
    password: await hashPassword('123'),
    isAdmin: true,
    avatarColor: randomMC.getColor(),
  },

  //--- 1
  {
    name: 'Admin User2',
    email: 'dt2@ga.co.uk',
    password: await hashPassword('123'),
    isAdmin: true,
    avatarColor: randomMC.getColor(),
  },

  //--- 2
  {
    name: 'John Doe',
    email: 's.job@gmail.com',
    password: await hashPassword('123'),
    avatarColor: randomMC.getColor(),
  },

  //--- 3
  {
    name: 'Jane Doe',
    email: 'stylo@gmail.com',
    password: await hashPassword('123'),
    avatarColor: randomMC.getColor(),
  },

  //--- 4
  {
    name: 'Jack Ryan',
    email: 'jacko@gmail.com',
    password: await hashPassword('123'),
    avatarColor: randomMC.getColor(),
  },

  //--- 5
  {
    name: 'Sherlock Holmes',
    email: 'sherlock@gmail.com',
    password: await hashPassword('123'),
    avatarColor: randomMC.getColor(),
  },
];

export default users;
