const _axios = require('axios');
const axios = _axios.create({
  baseURL: 'https://www.googleapis.com'
});

module.exports = {
  getThumbnail(req, res, next) {
    if (!req.nasaData) {
      return next();
    }
    const { media_type } = req.nasaData;
    if (media_type !== 'video') {
      return next();
    }
    const { url } = req.nasaData;
    const splited = url.split('/');
    const video_id = splited[splited.length - 1].split('?')[0];
    axios
      .get(`/youtube/v3/videos?part=snippet&id=${video_id}&key=${process.env.YOUTUBE_APIKEY}`)
      .then(({ data }) => {
        req.nasaData.tags = data.items[0].snippet.tags;
        req.nasaData.special = url;
        req.nasaData.url = data.items[0].snippet.thumbnails.maxres.url;
        next();
      })
      .catch(err => {
        console.log('Error at youtube', err);
        res.status(500).json({ message: 'error at youtube', err });
      })
  }
}
