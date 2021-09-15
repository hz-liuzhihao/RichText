import BaseEditor from './BaseEditor';
import { TextItemBuild, TextItemMeta } from '../build/TextItemBuild';
import { BaseEditorArgs } from './BaseEditor';
export class TextItemEditor extends BaseEditor<TextItemMeta> {

  protected build: TextItemBuild;

  private children: TextItemEditor[];

  public render(): void {
    throw new Error('Method not implemented.');
  }

  protected initData(args: BaseEditorArgs) {
    super.initData(args);
    this.children = [];
  }

  protected initMainDom() {
    const type = this.build.getProperty('type');
    if (type === 'text') {
      this.mainDom = this.parentDom;
      return;
    } else {
      super.initMainDom(type);
    }
  }

  protected initDom(): void {
    const children = this.build.getChildren();
    const type = this.build.getProperty('type');
    const content = this.build.getProperty('content');
    
    if (children != null && children.length > 0) {
      this.children = children.map(build => {
        const textItem = new TextItemEditor({
          build,
          workbench: this.workbench,
          domParent: this.mainDom,
        });
        return textItem
      });
    }
  }
  protected renderUndoItem(): void {
    throw new Error('Method not implemented.');
  }
}