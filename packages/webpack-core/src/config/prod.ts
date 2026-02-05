import type {Configuration} from 'webpack';
import {merge} from 'webpack-merge';

export function createProdConfig(
    baseConfig: Configuration
): Configuration {
    return merge(baseConfig, {
        devtool: 'source-map',
        optimization: {
            minimize: true,
        }
    });
}
