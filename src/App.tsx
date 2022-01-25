import Calendar from "./components/calendar";

import {
  BiCalendar,
  BiHome,
  BiSearch,
  BiPlusCircle,
  BiUserCircle,
} from "react-icons/bi";
import "./App.css";
import Header from "./components/header";
import CreateEvent from "./components/create-event";
import PostSlider from "./components/post-slider";

const App = () => {
  // const posts = useAppSelector((state) => state.posts);
  // const dispatch = useAppDispatch();
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center ">
        <Header />
        <Calendar />

        <nav className="w-full flex py-2 lg:py-3 justify-evenly border relative">
          <BiHome className="nav-icon" />
          <BiSearch className="nav-icon" />
          <BiPlusCircle className="nav-icon" />
          <BiCalendar className="nav-icon text-cyan-500" />
          <BiUserCircle className="nav-icon" />
          <CreateEvent />
        </nav>
      </div>
      <PostSlider />
    </>
  );
};

export default App;
