import express from "express";
import config from "./config";
import router from "./routes/";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";

const app = express();

// express middleware
app.use(express.json());
app.use(router);
app.use(notFoundError);
app.use(genericErrorHandler);

app.listen(config.port, () => {
  console.log(`Server listening at port ${config.port}`);
});
