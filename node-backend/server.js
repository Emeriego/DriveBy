const http = require("http");
const db = require("./models");
const app = require("./app");

const port = 8000;
const server = http.createServer(app);

// Sync the database and start the server
db.sequelize.sync({ alter: false })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
  
// Error handling
server.on('error', onError);
server.on('listening', onListening);

// Define error handling functions
function onError(error) {
  console.error("Server error:", error);
}

function onListening() {
  console.log("Server is listening");
}


