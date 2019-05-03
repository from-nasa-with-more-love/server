const _axios = require('axios');
const axios = _axios.create({
  baseURL: 'https://api.nasa.gov'
});

module.exports = {
  getApod(req, res, next) {
    const { date } = req.body;
    axios
      .get(`/planetary/apod?api_key=${process.env.NASA_APIKEY}&start_date=${date}&end_date=${date}`)
      .then(({ data }) => {
        req.nasaData = data[0];
        req.nasaData.tags = [];
        next();
      })
      .catch(err => {
        console.log('Error at nasa', err);
        res.status(500).json({ status: 500, message: 'error at nasa', err });
      })
  }
}
