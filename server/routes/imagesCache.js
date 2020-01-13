const fs = require('fs');
const { resolve } = require('path');
const sharp = require('sharp');

const storage = {};
fs.readdir(resolve(process.env.STATIC_DIR), (err, files) => {
  if (err) {
    console.error('CAN NOT CACHE FILES: ', JSON.stringify(err));
    return;
  }

  files.forEach(file => {
    sharp(resolve(process.env.STATIC_DIR, file))
      .resize({width: 64})
      .toBuffer()
      .then(data => {
        storage[file] = data;
      });
  });
});

const ImageCacheController = async (ctx) => {
  const name = ctx.params.name;

  if (!name) {
    ctx.status = 401;
    ctx.body = { error: 'URL not includes image name' };

    return;
  }
  
  if (storage[name]) {
    ctx.body = storage[name];
  } else {
    const stream = fs.createReadStream(resolve(process.env.STATIC_DIR, name));
    ctx.body = stream;
  }
};

module.exports = {
  ImageCacheController,
};
