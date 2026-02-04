import {LoaderType} from '../types/loader-type';

export function scriptsLoader(env: LoaderType) {
    if (env.script === 'ts') {
        return {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader',
                options: {
                    transpileOnly: env.mode === 'development'
                }
            }
        };
    }

    return {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
    };
}
