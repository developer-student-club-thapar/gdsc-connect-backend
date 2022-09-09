export default () => ({
  //5001 default as in new macos 5000 is already in use
  port: parseInt(process.env.PORT) || 5001,
  dbConfig: {
    mongo_url: process.env.MONGO_URL,
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
  },
});
