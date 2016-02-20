import loggers from "./loggers";

export default (err, req, res, next) => {

  let lines;

  if (err.stack) {
    lines = err.stack.split("\n");
  }

  loggers.expressErrors().info(lines.slice(0, 2).join());

  if (err.status === 400) {
    res.status(err.status);
    return res.json({ errors: err.errors });
  }

  res.status(err.status);

  let response = { errors: [{ message: err.message || err.path }] };

  res.json(response);
}
