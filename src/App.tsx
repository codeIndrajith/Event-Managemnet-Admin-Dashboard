import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayouts";
import HomePage from "./dashboard/pages/HomePage";
import VenuMangementPage from "./dashboard/pages/venu-management/VenuMangementPage";
import EventApprovalPage from "./dashboard/pages/event-approval/EventApprovalPage";
import AllEventsPage from "./dashboard/pages/events/AllEventsPage";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="venue-management" element={<VenuMangementPage />} />
          <Route path="event-approval" element={<EventApprovalPage />} />
          <Route path="events" element={<AllEventsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
