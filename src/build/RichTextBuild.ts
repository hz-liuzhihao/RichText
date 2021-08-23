import { TextRowMeta } from "./TextRowBuild";
import { StyleMeta } from './StyleBuild';

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

/**
 * 富文本数据层入口,负责管理整个数据层的链路
 */
export class RichTextBuild {

}