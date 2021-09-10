import { TextItemEditor } from './TextItemEditor';
import BaseEditor from './BaseEditor';
import { TextRowBuild, TextRowMeta } from '../build/TextRowBuild';
export class TextRowEditor extends BaseEditor<TextRowMeta> {

  protected build: TextRowBuild;

  private textItemEditors: TextItemEditor[];

}