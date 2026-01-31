module.exports = () => ({
  test: /\.(css|sass|scss)$/,
  use: [
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ],
});
