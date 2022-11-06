function checkBodyContains(...params) {
    return (req, res, next) => {
      for (const p of params) {
        if (req.body[p] === undefined || req.body[p] === '') {
          return res.status(400).json({
            message: `${p} cannot be missing in the body!`,
            status: false
          });
        }
      }
      next();
    };
  }

module.exports = checkBodyContains;