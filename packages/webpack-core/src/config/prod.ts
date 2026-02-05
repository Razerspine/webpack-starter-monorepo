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
                chunks: 'all',
            },
        }
    });
}
