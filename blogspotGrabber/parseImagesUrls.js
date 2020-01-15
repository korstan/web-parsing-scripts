import rp from 'request-promise';
import $ from 'cheerio';

const restrictedSymbols = /\\|\/|\:|\*|\?|\"|\<|\>|\|/g;

export default function(url) {
  console.log(`Parsing ${url}`);
  return rp(url)
    .then(function(html) {
      const wikiaItems = $('.separator', html);
      let resultUrls = [];
      wikiaItems.each((i, element) => {
        resultUrls.push($('img', element).attr('src'));
      });
      console.log('Done parsing!');
      return resultUrls;
    })
    .catch(function(err) {
      console.log('PARSING FAILED');
      console.error(err);
    });
}

function clearFileName(filename) {
  return filename.replace(restrictedSymbols, ' ');
}
