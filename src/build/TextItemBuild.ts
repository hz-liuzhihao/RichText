import { StyleBuild } from './StyleBuild';
import { BaseBuild, UndoItem, BaseBuildArgs } from '../flow/UndoManager';
export interface TextItemMeta {
  styleIndex?: number;
  /**
   * 标签类型,一般默认为span,当为text时是不需要进行包裹的
   */
  type: string;

  /**
   * 标签内容
   */
  content: any;

  /**
   * item下面还有元素
   */
  children?: TextItemMeta[];
}

// tslint:disable-next-line: no-empty-interface
export interface TextItemBuildArgs extends BaseBuildArgs {
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

  public constructor(args: TextItemBuildArgs) {
    super(args);
  }

  public restoreUndoItem(undoItem: UndoItem): void {
    throw new Error('Method not implemented.');
  }

  public initData() {
    this.textItems = [];
  }

  protected initMeta() {
    const meta = this.metaInfo;
    if (meta.children && meta.children.length) {
      meta.children.forEach(item => {
        this.textItems.push(new TextItemBuild({
          metaInfo: item
        }));
      });
    }
  }
}