const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = (env = {}) => {
  const isDev = env.mode === 'development';

  return {
    output: {
      path: path.join(process.cwd(), 'dist'),
      clean: true,
    },

    resolve: {
      alias: {
        '@views': path.join(process.cwd(), 'src/views/'),
        '@styles': path.join(process.cwd(), 'src/assets/styles/'),
        '@scripts': path.join(process.cwd(), 'src/assets/scripts/'),
        '@fonts': path.join(process.cwd(), 'src/assets/fonts/'),
        '@images': path.join(process.cwd(), 'src/assets/images/'),
        '@icons': path.join(process.cwd(), 'src/assets/icons/'),
      },
    },

    plugins: [
      new PugPlugin({
        entry: 'src/views/pages/',
        filename: ({ chunk }) => {
          let [name] = chunk.name.split('/');
          if (name === 'home') name = 'index';
          return `${name}.html`;
        },

        js: {
          filename: 'js/[name].[contenthash:8].js',
        },

        css: {
          filename: 'css/[name].[contenthash:8].css',
        },
      }),
    ],

    module: {
      rules: [
        require('./loaders/styles')(env),
        require('./loaders/scripts')(env),
        require('./loaders/assets')(),
      ],
    },
  };
};
