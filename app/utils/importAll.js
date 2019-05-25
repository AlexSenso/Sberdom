/**
 * Import all static files
 * @usage const images = importAll(require.context('../images', false, /\.(gif|jpe?g|svg)$/));
 * @usage <img src={images['image-01.jpg']}/>
 * @param r
 */
export default function importAll(r) {
  const images = {};
  r.keys().map(item => {
    images[item.replace('./', '')] = r(item);
    return undefined;
  });
  return images;
}
