//Class for our own errors
class TeamMgmtApiError extends Error {
    constructor(code, message) {
      super();
      this.name = "TeamMgmtApiError";
      this.code = code;
      this.message = message;
    }
  }
  
  //this allows for us to have all the try/catch of the app inside just one function
  //"routehandler" contains the endpoint name.
  //"async (req, res, next, ...args)" is the route, and the try/catch is the result passed as a parameter
  const catchErrors = (routeHandler) => async (req, res, next, ...args) => {
      try {
        console.log("catchErrors");
        //this will execute the endpoint which we passed in routeHandler
        await routeHandler(req, res, next, ...args);
        console.log("routeHandler OK");
      } catch (err) {
        //if there is an error "next" the next middleware in the endpoint chain, which eventually will be errorHandler which will handle the error
        next(err);
      }
    };
  
  const errorHandler = (err, req, res, next) => {
    if (err.name === "TeamMgmtApiError") {
      const { code, message } = err;
      return res.status(code).send({ error: message });
    }
    //TODO: isDevelopment necessary?
    res.status(500).send({
      error: `Internal Server Error: ${err}`,
    });
  };
  
  const errMalformed = (message) => {
    throw new TeamMgmtApiError(400, `Bad request: ${message}`);
  };
  
  const errUnauthorized = (message) => {
    throw new TeamMgmtApiError(401, message);
  };
  
  module.exports = {
    TeamMgmtApiError,
    catchErrors,
    errorHandler,
    errMalformed,
    errUnauthorized,
  };