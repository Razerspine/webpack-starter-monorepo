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
         * Disable default webpack entry (./src)
         * because entry is fully controlled by pug-plugin
         */
        entry: () => ({}),

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
                mode
            }),
        ],

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            alias: options.resolve?.alias ?? {}
        },
    };
}
