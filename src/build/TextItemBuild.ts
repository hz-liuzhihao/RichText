import { StyleBuild } from './StyleBuild';
import { BaseBuild, UndoItem, BaseBuildArgs } from '../flow/UndoManager';
export interface TextItemMeta {
  styleIndex: number;
  /**
   * 标签类型,一般默认为span,当为text时是不需要进行包裹的
   */
  type: string;

  /**
   * item下面还有元素
   */
  children: TextItemMeta[];
}

export interface TextItemBuildArgs extends BaseBuildArgs {
  a: any;
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