import type {Configuration} from 'webpack';

export function createProdConfig(
    baseConfig: Configuration
): Configuration {
    return {
        ...baseConfig,

        /**
         * Prevent webpack from injecting ./src in production
         */
        entry: () => ({}),

        devtool: false,

        optimization: {
            minimize: true,
            splitChunks: {
                chunks: 'all',
            },
        },
    };
}
