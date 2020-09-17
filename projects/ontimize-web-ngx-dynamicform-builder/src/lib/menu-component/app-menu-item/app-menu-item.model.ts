export interface AppMenuItem {
  id?: string;
  parent?: string;
  label: string;
  icon?: string;
  route?: string;
  type?: string;
  style?: string;
  closed?: boolean;
}
