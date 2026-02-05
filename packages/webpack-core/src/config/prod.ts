import type {Configuration} from 'webpack';
import {merge} from 'webpack-merge';

export function createProdConfig(
    baseConfig: Configuration
): Configuration {
    return merge(baseConfig, {
        devtool: false,
        optimization: {
            minimize: true,
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(s[ac]ss|less|css)$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
        }
    });
}
