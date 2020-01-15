import rp from 'request-promise';
import $ from 'cheerio';

const restrictedSymbols = /\\|\/|\:|\*|\?|\"|\<|\>|\|/g;

export default function(url) {
  console.log(`Parsing ${url}`);
  return rp(url)
    .then(function(html) {
      const wikiaItems = $('.wikia-gallery-item', html);
      let resultItems = [];
      wikiaItems.each((i, element) => {
        resultItems.push({
          name: clearFileName($('.lightbox-caption', element).text()),
          url:
            'http://4chanmusic.wikia.com' +
            $('.image.lightbox', element).attr('href'),
        });
      });
      console.log('Done parsing!');
      return resultItems;
    })
    .catch(function(err) {
      console.log('PARSING FAILED');
      console.error(err);
    });
}

function clearFileName(filename) {
  return filename.replace(restrictedSymbols, ' ');
}
