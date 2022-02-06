// require your server and launch it here
const server = require("./api/server");
PORT = 4000;
server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
