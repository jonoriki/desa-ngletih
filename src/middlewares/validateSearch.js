// middleware/validateSearch.js
module.exports = function (req, res, next) {
  const keyword = req.query.keyword;
  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Keyword tidak valid' });
  }
  next();
};
