export interface IProps {
  componentId: string;
  changeActiveCompany: (actionProps: object) => void;
  changeUser: (actionProps: object) => void;
  changeSessionToken: (actionProps: object) => void;
}

export interface IState {
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  email: string;
  family: string;
  isLoading: boolean;
}
