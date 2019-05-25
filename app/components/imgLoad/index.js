export default path => {
  let handle;
  try {
    // eslint-disable-next-line
    handle = require(path);
  } catch {
    // eslint-disable-next-line
    handle = require('images/default.jpg');
  }
  return handle;
};
