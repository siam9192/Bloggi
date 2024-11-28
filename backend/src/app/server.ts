import app from "./app";
const port = 5000;
async function main() {
  try {
    app.listen(port, () => {
      console.log("Blogi Server is Running on Port:", port);
    });
  } catch (error) {
    console.log(error);
  }
}

main();