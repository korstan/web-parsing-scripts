import rp from 'request-promise';
import $ from 'cheerio';
import fs from 'fs';

export default function(image, index, directory) {
  return rp(image.url)
    .then(function(html) {
      let element = $('#file.fullImageLink', html);
      let link = $('a', element)
        .first()
        .attr('href');
      return rp({ uri: link, encoding: null, resolveWithFullResponse: true });
    })
    .then(function(html) {
      let imageType = html.headers['content-type'].split('/').pop();
      let fileName = directory + `/(${index})${image.name}.${imageType}`;
      fs.writeFile(fileName, html.body, 'binary', error => {
        if (error) console.error(error);
      });
      return fileName;
    })
    .then(function(fileName) {
      console.log(`SUCCESS: ${fileName}`);
    })
    .catch(function(err) {
      console.error(err);
    });
}
