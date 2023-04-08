const isApiHealthy = (_, res) => {
  res.status(200).send("Healthy.");
};

module.exports = {
  isApiHealthy,
};
