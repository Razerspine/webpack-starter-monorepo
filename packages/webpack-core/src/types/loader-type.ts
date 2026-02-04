import {ModeType} from './mode-type';
import {StyleType} from './style-type';
import {ScriptType} from './script-type';

export interface LoaderType {
    mode: ModeType;
    script: ScriptType;
    style: StyleType;
}
