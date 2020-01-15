import fs from 'fs';

import parseImagesUrls from './parseImagesUrls.js';
import downloadImage from './downloadImage.js';

const urls = [
  'http://illustrationart.blogspot.com/2020/01/the-file-of-good-drawings.html',
];

export default function() {
  console.log('Start!');
  var urlsPromiseSequence = Promise.resolve();

  urls.forEach(url => {
    let dirName;
    urlsPromiseSequence = urlsPromiseSequence
      .then(function() {
        dirName = './blogspotGrabber/result/' + url.split('/').pop();
        fs.mkdirSync(dirName, { recursive: true });
        console.log(`Directory ${dirName} created`);
        return parseImagesUrls(url);
      })
      .then(function(imagesUrls) {
        console.log('Start downloading...');
        return Promise.all(
          imagesUrls.map((image, i) => {
            return downloadImage(image, i, dirName);
          }),
        );
      })
      .then(() => console.log('Done downloading!'))
      .catch(function(err) {
        console.error(err);
      });
  });

  urlsPromiseSequence.then(() => console.log('Finish!'));
}
