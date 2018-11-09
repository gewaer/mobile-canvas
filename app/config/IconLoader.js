// Import an iconset
import Icon from 'react-native-vector-icons/FontAwesome';

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    'heart': [22, '#000000'],
    'heart--active': [22, 'red'],
    
    'home': [22, '#000000'],
    'home--active': [22, 'red'],
};

const defaultIconProvider = Icon;

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName => {
            const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
            return Provider.getImageSource(iconName.replace(replaceSuffixPattern, ''), icons[iconName][0], icons[iconName][1]);
        })
    ).then(sources => {
        Object.keys(icons).forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]));

        // Call resolve (and we are done)
        resolve(true);
    });
});

export { iconsMap, iconsLoaded };