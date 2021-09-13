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

  public render(): void {
    throw new Error('Method not implemented.');
  }
  protected initDom(): void {
    throw new Error('Method not implemented.');
  }
  protected renderUndoItem(): void {
    throw new Error('Method not implemented.');
  }

}