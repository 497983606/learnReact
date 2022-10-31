export interface UserItem {
  name: string,
  id: string,
  age: string | number,
  status: string,
  org?: string,
}
export interface OrgItem {
  name: string,
  id: string,
  type: string,
  parent: string,
  representation: string,
  members: string[],
  child: OrgItem[]
}

export interface OrgObj {
  [key: string]: OrgItem
}
export interface setParams {
  id?: string,
  type: "member" | "org",
  action:  "del" | "addMember" | "addOrg" |  "editMember" | "editOrg" | "actived" | "representation",
  info: any
}

export interface OrgProps {
  treeData: OrgItem,
  members: UserItem[],
  setData: ({}:setParams) => void,
  child?: React.ReactNode
}

export interface UserProps {
  members: UserItem[],
  treeData: OrgItem,
  setData: ({}:setParams) => void
}

export interface UserDialogProps {
  form: UserItem,
  submit: ({}: UserItem) => void,
  title: string,
  visible: boolean,
  closeVisiable: ( ) => void
}

export interface OrgDialogProps {
  form: Pick<OrgItem, 'name' | 'parent'>,
  currentOrgId: string,
  submit: ({}: OrgItem) => void,
  title: string,
  visible: boolean,
  closeVisiable: ( ) => void
}