import { TextItemBuild, TextItemMeta } from './TextItemBuild';
import { BaseBuild, BaseBuildArgs, UndoItem } from '../flow/UndoManager';

export interface TextRowMeta {
  textItems: TextItemMeta[];
}

/**
 * 文本行数据层
 */
class TextRowBuild extends BaseBuild<TextRowMeta> {

  private textItems: TextItemBuild[];

  public restoreUndoItem(undoItem: UndoItem): void {
    throw new Error('Method not implemented.');
  }
  protected initData(args: BaseBuildArgs): void {
    throw new Error('Method not implemented.');
  }
  protected initMeta(): void {
    throw new Error('Method not implemented.');
  }
}