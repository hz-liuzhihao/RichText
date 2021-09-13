import { TextItemEditor } from './TextItemEditor';
import BaseEditor from './BaseEditor';
import { TextRowBuild, TextRowMeta } from '../build/TextRowBuild';
export class TextRowEditor extends BaseEditor<TextRowMeta> {

  protected build: TextRowBuild;

  private textItemEditors: TextItemEditor[];

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