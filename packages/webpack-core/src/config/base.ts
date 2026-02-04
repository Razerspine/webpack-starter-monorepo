import path from 'path';
import {LoaderType} from '../types/loader-type';

import {assetsLoader} from '../loaders/assets';
import {scriptsLoader} from '../loaders/scripts';
import {stylesLoader} from '../loaders/styles';
import {templatesLoader} from '../loaders/templates';

export function createBaseConfig(options: {
    root: string;
    env: LoaderType;
    templates?: {
        entry?: string;
    };
}) {
    const {root, env} = options;

    return {
        mode: env.mode,

        context: root,

        output: {
            path: path.join(root, 'dist'),
            clean: true
        },

        module: {
            rules: [
                assetsLoader(),
                scriptsLoader(env),
                stylesLoader(env)
            ]
        },

        plugins: [
            ...templatesLoader({
                entry: options.templates?.entry,
                mode: env.mode
            })
        ],

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        }
    };
}
