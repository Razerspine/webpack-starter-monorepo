import {ModeType} from './mode-type';
import {ScriptType} from './script-type';
import {StyleType} from './style-type';
import {Configuration} from 'webpack';

export type ConfigOptionType = {
    mode: ModeType;
    scripts: ScriptType;
    styles: StyleType;
    templates?: {
        /**
         * Path to pug pages directory
         * @default 'src/views/pages'
         */
        entry?: string;
    };
    /**
     * Webpack resolve config (aliases, extensions, etc.)
     * Passed through to final webpack config
     */
    resolve?: Configuration['resolve']
};
