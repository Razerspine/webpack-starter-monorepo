import PugPlugin from 'pug-plugin';
import path from 'path';

export function templatesLoader(options: {
    entry?: string;
    mode: 'development' | 'production';
}) {
    return [
        new PugPlugin({
            entry: path.resolve(process.cwd(), options.entry ?? 'src/views/pages/'),

            loaderOptions: {
                method: 'render',
            },

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
            }
        }),
    ];
}
