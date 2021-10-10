const Jimp = require('jimp')

const resizeImage = (imageUrl) => Jimp.read(imageUrl)
  .then(img => {
    return img
      .resize(250, 250) // resize
      .write(imageUrl) // save
  })
  .catch(err => {
    console.error(err)
  })

module.exports = resizeImage
