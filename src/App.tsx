import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayouts";
import HomePage from "./dashboard/pages/HomePage";
import VenuMangementPage from "./dashboard/pages/venu-management/VenuMangementPage";
import EventApprovalPage from "./dashboard/pages/event-approval/EventApprovalPage";
import AllEventsPage from "./dashboard/pages/events/AllEventsPage";
import SignInPage from "./dashboard/pages/auth/SignInPage";
import PersistAuth from "./dashboard/components/auth/PersistAuth";
import NotFoundPage from "./dashboard/pages/404/NotFoundPage";
import EventApproveOrRejectPage from "./dashboard/pages/event-approval/Approve & Reject/EventApproveOrRejectPage";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route element={<PersistAuth />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/dashboard/venue-management"
              element={<VenuMangementPage />}
            />
            <Route
              path="/dashboard/event-approval"
              element={<EventApprovalPage />}
            />
            <Route
              path="/dashboard/event-approval/:id"
              element={<EventApproveOrRejectPage />}
            />

            <Route path="/dashboard/events" element={<AllEventsPage />} />
          </Route>

          {/* Not Found Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
