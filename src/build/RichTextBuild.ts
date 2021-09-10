import { TextRowMeta, TextRowBuild } from './TextRowBuild';
import { StyleMeta, StyleBuild } from './StyleBuild';
import { BaseBuild, BaseBuildArgs, UndoItem } from '../flow/UndoManager';

export interface RichTextMeta {
  /**
   * 文本行,每一行中的元素都是行内元素,而文本行是块状元素
   */
  textRows: TextRowMeta[];

  /**
   * 样式
   */
  styles: StyleMeta[];
}
export interface RichTextBuildArgs extends BaseBuildArgs {
  metaInfo: RichTextMeta;
}

/**
 * 富文本数据层入口,负责管理整个数据层的链路
 */
export class RichTextBuild extends BaseBuild<RichTextMeta> {

  /**
   * 所有引用的样式列表
   */
  private styleBuilds: StyleBuild[];

  /**
   * 富文本行
   */
  private textRowBuilds: TextRowBuild[];

  public restoreUndoItem(undoItem: UndoItem): void {
    throw new Error("Method not implemented.");
  }
  protected initData(args: RichTextBuildArgs): void {
    this.textRowBuilds = [];
    this.styleBuilds = [];
  }

  protected initMeta(): void {
    const meta = this.metaInfo;
    meta.styles.forEach(style => this.styleBuilds.push(new StyleBuild({
      metaInfo: style
    })));
  }

}