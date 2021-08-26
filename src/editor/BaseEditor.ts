import { BaseBuild, IWorkBench } from '../flow/UndoManager';
export interface BaseEditorArgs {
  build: BaseBuild<any>;


}

export default abstract class BaseEditor {

  protected workbench: IWorkBench;

  protected mainDom: HTMLElement;

  protected parentDom: HTMLElement;

  protected mainClassName: string;
}