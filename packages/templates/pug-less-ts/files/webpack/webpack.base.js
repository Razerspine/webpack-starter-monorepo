const path = require('path');
const templates = require('./loaders/templates');
const uiKit = require('@razerspine/pug-ui-kit');

module.exports = (env = {}) => {
  const templatesConfig = templates(env);

  return {
    output: {
      path: path.join(process.cwd(), 'dist'),
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@views': path.join(process.cwd(), 'src/views/'),
        '@styles': path.join(process.cwd(), 'src/assets/styles/'),
        '@scripts': path.join(process.cwd(), 'src/assets/scripts/'),
        '@fonts': path.join(process.cwd(), 'src/assets/fonts/'),
        '@images': path.join(process.cwd(), 'src/assets/images/'),
        '@icons': path.join(process.cwd(), 'src/assets/icons/'),
        'pug-ui-kit': uiKit.paths.mixins,
      },
    },

    plugins: [...templatesConfig.plugins],

    module: {
      rules: [
        require('./loaders/styles')(env),
        require('./loaders/scripts')(env),
        require('./loaders/assets')(),
      ],
    },
  };
};
