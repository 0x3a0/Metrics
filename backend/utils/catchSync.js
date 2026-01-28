const catchSync = fn => {
  return (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

export default catchSync;