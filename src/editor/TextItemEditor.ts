import BaseEditor from './BaseEditor';
import { TextItemBuild, TextItemMeta } from '../build/TextItemBuild';
export class TextItemEditor extends BaseEditor<TextItemMeta> {

  protected build: TextItemBuild;
  
  private children: TextItemEditor[];
  
}