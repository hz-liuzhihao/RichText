import { RichTextBuild } from '../build/RichTextBuild';
import { TextRowEditor } from './TextRowEditor';

export interface RichTextEditorArgs {

  build: RichTextBuild;
}

/**
 * 富文本编辑器,负责局部渲染编辑区内容
 */
export class RichTextEditor {

  private richTextBuild: RichTextBuild;

  private textRowEditors: TextRowEditor[];

  public constructor(args: RichTextEditorArgs) {
    this.richTextBuild = args.build;
  }
}