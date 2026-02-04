export function createProdConfig() {
    return {
        devtool: false,
        optimization: {
            minimize: true,
            splitChunks: {
                chunks: 'all'
            }
        }
    };
}
