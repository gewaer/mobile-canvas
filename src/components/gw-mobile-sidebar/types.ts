export interface IProps {
  resources: IResource[];
  showSidebar?: boolean;
  headerUserName?: string;
  headerCompanyName?: string;
  headerBackgroundColor?: string;
  headerTextColor?: string;
  sectionItemTextStyle?: object;
  customHeader?: any;
  customSectionItem?: any;
  sidebarBackgroundColor?: string;
  sectionItemTextColor?: string;
  activeComponentId: string;
}

export interface IResource {
  apps_id: string;
  browse_fields: string;
  created_at: string;
  id: string;
  is_deleted: string;
  menu_order: string;
  model_name: string;
  name: string;
  parents_id: string;
  show: string;
  slug: string;
  updated_at: string;
  use_elastic: string;
  icon: string;
  mobile_component_type: string;
  mobile_navigation_type: string;
  mobile_tab_index: string;
}
