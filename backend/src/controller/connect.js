let homePage =
  "/Users/manishsharma/Desktop/Projects/BigBuy/frontend/index.html";

function listenLog() {
  console.log("server is running");
}

function errorHandling(req, res) {
  res.json({
    message: "invalid command",
  });
}
function getHome(req, res) {
  res.sendFile(homePage);
}

module.exports = { listenLog, errorHandling, getHome };
