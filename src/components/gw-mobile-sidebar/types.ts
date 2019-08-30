export interface IProps {
  resources: IResource[];
  showSidebar?: boolean;
  headerUserName?: string;
  headerCompanyName?: string;
  sectionItemTextStyle?: object;
  customHeader?: any;
  customSectionItem?: any;
  sidebarBackgroundColor?: string;
  sectionItemTextColor?: string;
}

export interface IResource {
  apps_id: string;
  browse_fields: string;
  created_at: string;
  id: string;
  is_deleted: string;
  menu_order: string;userName
  model_name: string;
  name: string;
  parents_id: string;
  show: string;
  slug: string;
  updated_at: string;
  use_elastic: string;
  icon: string;
}
