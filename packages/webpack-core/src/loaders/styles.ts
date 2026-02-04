import {LoaderType} from '../types/loader-type';

export function stylesLoader(env: LoaderType) {
    const isLess = env.style === 'less';

    return {
        test: isLess ? /\.(css|less)$/ : /\.(css|scss|sass)$/,
        use: [
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: ['autoprefixer']
                    }
                }
            },
            isLess
                ? {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {javascriptEnabled: true}
                    }
                }
                : 'sass-loader'
        ]
    };
}
