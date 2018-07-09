export default function (req, res, next) {
  req.body.updateAt = new Date();
  next();
}
