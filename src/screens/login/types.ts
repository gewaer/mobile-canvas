export interface IProps {
  componentId: string;
  changeActiveCompany: (actionProps: object) => void;
  changeUser: (actionProps: object) => void;
  changeSessionToken: (actionProps: object) => void;
}

export interface IState {
  username: string;
  password: string;
  isLoading: boolean;
  isLoginIn: boolean;
}
