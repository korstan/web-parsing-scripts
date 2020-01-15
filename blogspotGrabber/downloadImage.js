import rp from 'request-promise';
import fs from 'fs';

export default function (url, index, directory) {
   return rp({ uri: url, encoding: null, resolveWithFullResponse: true })
      .then(function (html) {
         let fileName = directory + `/(${index})${url.split('/').pop()}`;
         fs.writeFile(fileName, html.body, 'binary', (error) => {
            if (error)
               console.error(error);
         });
         return fileName;
      })
      .then(function (fileName) {
         console.log(`SUCCESS: ${fileName}`);
      })
      .catch(function (err) {
         console.error(err);
      });
}