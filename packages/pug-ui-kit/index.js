const path = require('path');

module.exports = {
  paths: {
    scss: path.join(__dirname, 'scss'),
    less: path.join(__dirname, 'less'),
    mixins: path.join(__dirname, 'mixins')
  },
  // helper
  getStylePath: (type = 'scss') => path.join(__dirname, type, `ui-kit.${type}`)
};
