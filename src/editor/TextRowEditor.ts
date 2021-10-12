import { TextItemEditor } from './TextItemEditor';
import BaseEditor from './BaseEditor';
import { TextRowBuild, TextRowMeta } from '../build/TextRowBuild';
import { BaseEditorArgs } from './BaseEditor';
export class TextRowEditor extends BaseEditor<TextRowMeta> {

  protected build: TextRowBuild;

  private textItemEditors: TextItemEditor[];

  public render(): void {
    throw new Error('Method not implemented.');
  }

  protected initData(args: BaseEditorArgs) {
    super.initData(args);
    this.textItemEditors = [];
    this.mainClassName = 'textroweditor';
  }

  protected initDom(): void {
    const textItemBuilds = this.build.getTextItemBuild();
    this.textItemEditors = textItemBuilds.map(build => {
      const textItemEditor = new TextItemEditor({
        build,
        workbench: this.workbench,
        domParent: this.mainDom,
      });
      return textItemEditor;
    });
  }
  protected renderUndoItem(): void {
    throw new Error('Method not implemented.');
  }
}