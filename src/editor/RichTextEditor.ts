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

  protected build: RichTextBuild;

  private textRowEditors: TextRowEditor[];

  public render(): void {
    this.textRowEditors.forEach(item => item.render());
  }

  public initData(args: RichTextEditorArgs) {
    super.initData(args);
    this.textRowEditors = [];
  }

  protected initDom(): void {
    const textRowBuilds = this.build.getTextRowBuilds();
    this.textRowEditors = textRowBuilds.map(build => {
      const textRowEditor = new TextRowEditor({
        build,
        domParent: this.mainDom,
        workbench: this.workbench
      });
      return textRowEditor;
    });
  }
  protected renderUndoItem(): void {
    throw new Error('Method not implemented.');
  }

}