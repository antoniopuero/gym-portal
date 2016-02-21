import _ from "lodash";
export class NotFound extends Error {
  constructor(err) {
    super(err.message);
    this.message = err.message || "NotFound";
  }
}

function extractError (err) {
  return err.response.body.Error ? err.response.body.Error.Message : _.pluck(err.response.body.errors, "message").join(";");
}

export class Forbidden extends Error {
  constructor(err) {
    super(err.message);
    this.message = extractError(err) || "Forbidden";
  }
}

export class Unauthorized extends Error {
  constructor(err) {
    super(err.message);
    this.message = extractError(err)  || "Unauthorized";
  }
}

export class BadRequest extends Error {
  constructor(err) {
    super(err.message);
    this.message = extractError(err)  || "Bad request";
  }
}

export class ServerError extends Error {
  constructor(err) {
    super(err.message);
    this.message = extractError(err)  || "Server error";
  }
}
export class LostInternetConnection extends Error {
  constructor(err) {
    super(err.message);
    this.message = err.message || "Internet connection has been lost";
  }
}

const errors = {
  0: LostInternetConnection,
  400: BadRequest,
  401: Unauthorized,
  403: Forbidden,
  404: NotFound,
  500: ServerError
};


export default function getError(err) {
  if (errors[err.status]) {
    return new errors[err.status](err);
  } else {
    return err;
  }
}
