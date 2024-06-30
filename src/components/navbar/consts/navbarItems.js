import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import CampaignIcon from "@mui/icons-material/Campaign";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PinDropIcon from "@mui/icons-material/PinDrop";
export const mainNavbarItems = [
  {
    id: 0,
    icon: <DashboardIcon />,
    label: "Dashboard",
    route: "",
  },
  {
    id: 1,
    icon: <AccountCircle />,
    label: "Profile",
    route: "ProfileForm",
  },
  {
    id: 2,
    icon: <GroupIcon />,
    label: "Employees",
    route: "employees",
  },
  {
    id: 3,
    icon: <DepartureBoardIcon />,
    label: "Route & Schedule",
    route: "routeschedule",
  },
  {
    id: 4,
    icon: <PinDropIcon />,
    label: "Location Management",
    route: "locationmanagement",
  },
  {
    id: 5,
    icon: <CampaignIcon />,
    label: "Announcement and Delay Report",
    route: "announcementanddelayreports",
  },
  {
    id: 6,
    icon: <LocalShippingIcon />,
    label: "Package",
    route: "packagetransfer",
  },
];
