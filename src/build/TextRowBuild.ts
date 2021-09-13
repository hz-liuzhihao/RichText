import { TextItemBuild, TextItemMeta } from './TextItemBuild';
import { BaseBuild, BaseBuildArgs, UndoItem } from '../flow/UndoManager';

export interface TextRowMeta {
  /**
   * 行中的所有item
   */
  items: TextItemMeta[];

  /**
   * 行级样式
   */
  styleIndex?: number;
}

// tslint:disable-next-line: no-empty-interface
export interface TextRowBuildArgs extends BaseBuildArgs {
}

/**
 * 文本行数据层
 */
export class TextRowBuild extends BaseBuild<TextRowMeta> {

  private textItems: TextItemBuild[];

  public constructor(args: TextRowBuildArgs) {
    super(args);
  }

  public restoreUndoItem(undoItem: UndoItem): void {
    throw new Error('Method not implemented.');
  }
  protected initData(args: BaseBuildArgs): void {
    this.textItems = [];
  }
  protected initMeta(): void {
    const meta = this.metaInfo;
    if (meta.items && meta.items.length) {
      meta.items.forEach(item => {
        this.textItems.push(new TextItemBuild({
          metaInfo: item
        }));
      })
    }
  }
}