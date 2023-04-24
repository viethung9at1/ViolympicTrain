import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import {  NumberChooseInc } from "./components/NumberChooseInc";
import {Login} from "./components/Login"
import { NumberChooseSame } from "./components/NumberChooseSame";
import ChooseFunction from "./components/ChooseFunction"
import Calculate from "./components/Calculate";
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
  },
  {
    path:"/number-choose-same",
    element: <NumberChooseSame />
  },
  {
    path:"/choose-function",
    element: <ChooseFunction />
  },
  {
    path:"/calculate-com",
    element: <Calculate />
  }
];

export default AppRoutes;
