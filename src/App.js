import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import HomeView from "./view/HomeView";
import GatewayView from "./view/GatewayView";
import JournalView from "./view/JournalView";
import JournalDetailView from "./view/JournalDetailView";
import CreateView from "./view/CreateView";
import ManagerView from "./view/ManagerView";
import {ManageUser} from "./component/manager/ManageUser";
import {ManageJournal} from "./component/manager/ManageJournal";
import ManageJournalDetail from "./component/manager/ManageJournalDetail";
import YourJournalView from "./view/YourJournalView";
import ModifyView from "./view/ModifyView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GatewayView/>
  },
  {
    path: "/home",
    element: <HomeView/>
  },
  {
    path: "/journal",
    element: <JournalView/>,
  },
  {
    path: "/journal_detail",
    element: <JournalDetailView/>
  },
  {
    path:"/journal/create",
    element:<CreateView/>
  },
  {
    path:"/Manager",
    element: <ManagerView/>,
    children:[
      {
        path:"/Manager/User",
        element: <ManageUser/>
      },
      {
        path: "/Manager/Journal",
        element: <ManageJournal/>
      },
      {
        path: "/Manager/JournalDetail",
        element:<ManageJournalDetail/>
      }
    ]
  },
  {
    path: "/yourjournal",
    element:<YourJournalView/>
  },
  {
    path:"/Modify",
    element:<ModifyView/>
  }
    ]
);
function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
