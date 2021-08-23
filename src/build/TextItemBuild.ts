import { StyleBuild } from './StyleBuild';
import { BaseBuild, UndoItem } from '../flow/UndoManager';
export interface TextItemMeta {
  styleIndex: number;
}

/**
 * 文本行的文本item,都是行内元素,可能会变身为TextRowBuild
 */
export class TextItemBuild extends BaseBuild<TextItemMeta> {
  /**
   * 每个文本item下面又会有若干个textItme
   */
  private textItems: TextItemBuild[];

  private styleBuild: StyleBuild;

  public restoreUndoItem(undoItem: UndoItem): void {
    throw new Error('Method not implemented.');
  }

  public initData() {
    throw new Error('Method not implemented.');
  }

  protected initMeta() {
    throw new Error('Method not implemented.');
  }

}