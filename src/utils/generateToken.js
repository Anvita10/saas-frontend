function generateToken(id) {
  const date = Date.now();
  let token = Math.random() + date + id;
  return token;
}

export default generateToken;
