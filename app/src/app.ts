import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/formRoutes";
import ApiResponse, { HttpStatusCode } from "./models/response";

const router: Express = express();

/** Logging */
router.use(morgan("dev"));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods","GET,DELETE,POST,OPTIONS,PUT"
  );

  // set the CORS method headers
  if (req.method === "PATCH") {
    res.header("Access-Control-Allow-Methods", "GET,DELETE,POST,OPTIONS,PUT");
    return res.status(200).json({});
  }
  next();
});

/** Routes */
router.use("/api/", routes);

/** Error handling */
router.use((req, res, next) => {
  return res
    .status(HttpStatusCode.NOT_FOUND)
    .send(new ApiResponse(null, HttpStatusCode.NOT_FOUND, "not found"));
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 5002;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
