import bcrypt from 'bcrypt'

const encryptPassword = async (userPassword) => {
  const saltRounds = 10;
  const encryptedpassword = await bcrypt.hash(userPassword,saltRounds)
  return encryptedpassword;
}

const matchPassword = async (loginPassword, dbPassword) => {
  return bcrypt.compare(loginPassword,dbPassword);
}
export {encryptPassword, matchPassword};