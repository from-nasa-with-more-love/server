const _axios = require('axios');
const axios = _axios.create({
  baseURL: 'https://www.googleapis.com'
});

module.exports = {
  getLangs(req, res) {
    const langs = ['id', 'su', 'jv', 'ms'];
    let promises = [];
    if (!req.nasaData) {
      res.status(500).json({ status: 500, message: 'failed to load data' });
    }
    const { date, title, explanation, url, tags, special } = req.nasaData;
    langs.forEach(lang => {
      promises.push(axios
        .get(`/language/translate/v2?key=${process.env.GTRANSLATE_APIKEY}&source=en&target=${lang}&q=${explanation}`));
    })
    let translated = {};
    Promise
      .all(promises)
      .then(transLangs => {
        transLangs = transLangs.map(lang => lang.data);
        for (let index in langs) {
          translated[langs[index]] = transLangs[index].data.translations[0].translatedText;
        }
        res.status(200).json({
          status: 200,
          message: 'data created',
          data: { date, title, url, explanation, translated, tags, special: special||null }
        })
      })
      .catch(err => {
        console.log('Error at translate', err);
        res.status(500).json({ status: 500, message: 'error at translate', err });
      })
  }
}
