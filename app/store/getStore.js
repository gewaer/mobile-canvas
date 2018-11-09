import configureStore from "./configureStore"
import { Provider } from "react-redux";
import { registerScreen } from "../registerScreen";

const store = configureStore();
registerScreen(store, Provider);

export default function getStore() {
    return store;
}
