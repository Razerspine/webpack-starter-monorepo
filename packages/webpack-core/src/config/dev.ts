import type {Configuration as WebpackConfiguration} from 'webpack';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server';

type DevConfig = WebpackConfiguration & {
    devServer?: DevServerConfiguration;
};

export function createDevConfig(baseConfig: WebpackConfiguration): DevConfig {
    return {
        ...baseConfig,

        /**
         * Prevent webpack-dev-server from injecting ./src entry
         */
        entry: () => ({}),

        devtool: 'eval-source-map',

        devServer: {
            static: {
                directory: 'public',
            },
            hot: true,
            open: true,
            compress: true,
            port: 8080,
        },
    };
}
