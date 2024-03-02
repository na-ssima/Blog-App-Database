const checkUserRole = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (userRole === requiredRole) {
        next();
      } else {
        res.status(403).json({ message: 'Permission denied' });
      }
    };
  };
  
  module.exports = {
    checkUserRole,
  };
  