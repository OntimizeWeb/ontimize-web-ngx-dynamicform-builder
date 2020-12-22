import * as uuid from 'uuid';

export class ComponentNode {
  public attr: string;
  public children: ComponentNode[];
  public uId: string;

  constructor(public data: any) {
    this.attr = data.attr;
    this.uId = uuid.v4();
  }
}

export class ComponentFlatNode {
  public attr: string;
  public uId: string;
  public expandable: boolean;
  public empty: boolean;
  public hover: boolean;
  public display: any;
  public selected: boolean;
  public temp: boolean;
  public hoverSelected: boolean;

  constructor(node: ComponentNode, public level: number) {
    this.attr = node.attr;
    this.uId = node.uId;
    this.display = node.data.display;
    this.expandable = !!node.children;
    this.empty = node.children && node.children.length === 0;
  }
}