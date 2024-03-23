import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Hits from "./pages/dashboard/hits";
import SurveyResponse from "./pages/dashboard/surveyResponse";
import CancellationData from "./pages/dashboard/cancellationData";
import RatnaAndTrail from "./pages/dashboard/ratnaAndTrailData";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Game Metric Tracker",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Home Run Hits ",
        path: "/home-run-hits",
        element: <Hits/>,
      },
      
      {
        icon: <HomeIcon {...icon} />,
        name: "Survey Responses",
        path: "/suervey-response",
        element: <SurveyResponse/>,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Ratna & Trial Data",
        path: "/ratna-and-trail",
        element: <RatnaAndTrail/> ,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Cancellation Data",
        path: "/cancellation-data",
        element: <CancellationData/>,
      },
    ],
  },

  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
