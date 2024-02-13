import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import CampaignIcon from "@mui/icons-material/Campaign";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const mainNavbarItems = [
  {
    id: 0,
    icon: <DashboardIcon />,
    label: "Dashboard",
    route: "",
  },
  {
    id: 1,
    icon: <GroupIcon />,
    label: "Employees",
    route: "employees",
  },
  {
    id: 2,
    icon: <DepartureBoardIcon />,
    label: "Route & Schedule",
    route: "routeschedule",
  },
  {
    id: 3,
    icon: <CampaignIcon />,
    label: "Announcement and Delay Report",
    route: "announcementanddelayreports",
  },
  {
    id: 4,
    icon: <LocalShippingIcon />,
    label: "Package",
    route: "packagetransfer",
  },
];
