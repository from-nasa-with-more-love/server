const _axios = require('axios');
const axios = _axios.create({
  baseURL: 'https://api.nasa.gov'
});

module.exports = {
  getApod(req, res, next) {
    const { date } = req.body;
    if (new Date(date) > new Date()) {
      return res.status(400).json({ status: 400, message: 'error at nasa: you come from the future' });
    }
    axios
      .get(`/
      /apod?api_key=${process.env.NASA_APIKEY}&start_date=${date}&end_date=${date}`)
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
