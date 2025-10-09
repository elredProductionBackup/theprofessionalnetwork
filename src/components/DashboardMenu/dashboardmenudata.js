import { Icons } from "../../assets/Icons/Icons";


export const menu = [
  {
    id: 1,
    title: "Dashboard",
    icon: Icons.DASHBOARD,
    icon_dark: Icons.DASHBOARD_DARK,
    path: '/main',
    // tag: 'main'
  },
  {
    id: 2,
    title: "Users",
    icon: Icons.USERS,
    icon_dark: Icons.USERS_DARK,
    path: '/main/users',
    // tag: 'users'
  },
  {
    id: 3,
    title: "Needs",
    icon: Icons.NEEDS,
    icon_dark: Icons.NEEDS_DARK,
    path:'/main/needs',
    // tag:"needs"
  },
  {
    id: 4,
    title: "Leads",
    icon: Icons.LEADS,
    icon_dark: Icons.LEADS_DARK,
    path:"/main/leads",
    // tag:"leads"
  },
  {
    id: 6,
    title: "Feedbacks",
    icon: Icons.FEEDBACK,
    icon_dark: Icons.FEEDBACK_DARK,
    path:"/main/feedbacks",
  },
  {
    id: 7,
    title: "Network Requests",
    icon: Icons.NETWORK_REQUESTS,
    icon_dark: Icons.NETWORK_REQUESTS_DARK,
    path:"/main/network-requests",
  },
];
