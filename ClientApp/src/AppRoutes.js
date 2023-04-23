import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { NumberChoose, NumberChooseInc } from "./components/NumberChooseInc";
import {Login} from "./components/Login"
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path:"/number-choose-inc",
    element: <NumberChooseInc />
  },
  {
    path:"/login",
    element: <Login />
  }
];

export default AppRoutes;
