import BaseEditor from './BaseEditor';
import { TextItemBuild, TextItemMeta } from '../build/TextItemBuild';
export class TextItemEditor extends BaseEditor<TextItemMeta> {

  protected build: TextItemBuild;

  private children: TextItemEditor[];

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