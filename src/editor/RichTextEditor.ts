import { RichTextBuild, RichTextMeta } from '../build/RichTextBuild';
import { TextRowEditor } from './TextRowEditor';
import BaseEditor from './BaseEditor';
import { BaseEditorArgs } from './BaseEditor';

export interface RichTextEditorArgs extends BaseEditorArgs {

  build: RichTextBuild;
}

/**
 * 富文本编辑器,负责局部渲染编辑区内容
 */
export class RichTextEditor extends BaseEditor<RichTextMeta> {

  private textRowEditors: TextRowEditor[];
}