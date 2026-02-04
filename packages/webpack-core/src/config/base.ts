import {assetsLoader} from '../loaders/assets';
import {scriptsLoader} from '../loaders/scripts';
import {stylesLoader} from '../loaders/styles';
import {templatesLoader} from '../loaders/templates';
import {ModeType} from '../types/mode-type';
import {ConfigOptionType} from '../types/config-option-type';

export function createBaseConfig(options: ConfigOptionType) {
    const mode: ModeType = options.mode ?? 'development';

    return {
        mode,

        /**
         * IMPORTANT:
         * Explicit empty entry to prevent webpack default './src'
         * PugPlugin controls entry points
         */
        entry: {},

        output: {
            clean: true,
        },

        module: {
            rules: [
                assetsLoader(),
                scriptsLoader(options),
                stylesLoader(options),
            ],
        },

        plugins: [
            ...templatesLoader({
                entry: options.templates?.entry,
                mode,
            }),
        ],

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
    };
}
