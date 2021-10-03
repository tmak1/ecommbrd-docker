import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  try {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};
