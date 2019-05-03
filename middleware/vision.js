require('dotenv').config();
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});


module.exports = {
  getTags(req, res, next) {
    if (!req.nasaData) {
      return next();
    }
    const { url, tags } = req.nasaData;
    client
      .labelDetection(url)
      .then(results => {
        let labels = results[0].labelAnnotations;
        labels = labels.map(label => label.description);
        let newTags = tags.concat(labels);
        let tmpObj = {}
        newTags.forEach(tag => tmpObj[tag] = tag);
        newTags = [];
        for(let key in tmpObj) {
          newTags.push(key);
        }
        req.nasaData.tags = newTags;
        next();
      })
      .catch(err => {
        console.log('Error at vision', err);
        res.status(500).json({ status: 500, message: 'error at vision', err });
      })
  }
}