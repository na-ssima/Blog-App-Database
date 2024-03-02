const errorHandling = (err, req, res, next) => {
    if(err){
        res.send(' Please try again');
      }
      else{
        next();
      }
    };
  module.exports = errorHandling;