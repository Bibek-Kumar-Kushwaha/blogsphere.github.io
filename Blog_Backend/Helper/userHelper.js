import bcrypt from 'bcrypt'

const encryptPassword = async (userPassword) => {
  const saltRounds = 10;
  const encryptedpassword = await bcrypt.hash(userPassword,saltRounds)
  return encryptedpassword;
}

export {encryptPassword}