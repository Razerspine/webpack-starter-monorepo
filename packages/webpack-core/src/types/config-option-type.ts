import {ModeType} from './mode-type';
import {ScriptType} from './script-type';
import {StyleType} from './style-type';

export type ConfigOptionType = {
    mode: ModeType;
    scripts: ScriptType;
    styles: StyleType;
    templates: {
        entry: string;
    };
};
