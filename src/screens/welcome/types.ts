export interface IWelcomeState {
  isLoading: boolean;
}
export interface IWelcomeProps {
  changeActiveScreen: ({ activeScreen }: { activeScreen: string }) => void;
  changeSessionToken: ({ token }: { token: String }) => void;
  changeUser: () => void;
  changeActiveCompany: () => void;
  componentId: string;
}

export interface ICarrouselItem {
  mediaSource: string;
  title: string;
  content: string;
}
