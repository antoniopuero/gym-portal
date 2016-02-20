import winston from "winston";
import path from "path";
import fs from "fs";

export default {
  expressErrors () {
    let logDirectory = path.join(__dirname, "../logs");

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    return new winston.Logger({
      transports: [
        new winston.transports.File({
          filename: path.join(logDirectory, "express-errors.log"),
          level: "debug"
        })
      ]
    })
  }
};
