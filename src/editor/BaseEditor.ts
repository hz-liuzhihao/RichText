import { BaseBuild, IWorkBench } from '../flow/UndoManager';
export interface BaseEditorArgs {
  build: BaseBuild<any>;


}

export default abstract class BaseEditor<T> {

  protected build: BaseBuild<T>;

  protected workbench: IWorkBench;

  protected mainDom: HTMLElement;

  protected parentDom: HTMLElement;

  protected mainClassName: string;

  public constructor(args: BaseEditorArgs) {
    this.build = args.build;
  }
}