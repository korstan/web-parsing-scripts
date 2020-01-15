import blogspotGrabber from './blogspotGrabber/blogspotGrabber.js';
import muWikiSpood from './muWikiSpood/muWikiSpood.js';

export default [
    {
        name: 'Blogspot Grabber',
        script: blogspotGrabber,
    },
    {
        name: 'Mu Wiki Spood',
        script: ()=>console.log('This script is deprecated (changes in web page structure broke it)\nYou can enable this script manually. Check out scriptList.js'),
    }
];