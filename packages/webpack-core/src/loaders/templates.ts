import PugPlugin from 'pug-plugin';

export function templatesLoader(options: {
    entry?: string;
    mode: 'development' | 'production';
}) {
    return [
        new PugPlugin({
            entry: options.entry ?? 'src/views/pages',

            baseDir: process.cwd(),

            filename: ({chunk}: any) => {
                let [name] = chunk.name.split('/');
                if (name === 'home') name = 'index';
                return `${name}.html`;
            },

            js: {
                filename:
                    options.mode === 'production'
                        ? 'js/[name].[contenthash:8].js'
                        : 'js/[name].js',
            },

            css: {
                filename:
                    options.mode === 'production'
                        ? 'css/[name].[contenthash:8].css'
                        : 'css/[name].css',
            },
        }),
    ];
}
