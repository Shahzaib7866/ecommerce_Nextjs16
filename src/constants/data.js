// import { title } from "node:process";

import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import { FaProductHunt } from "react-icons/fa6";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import MarkEmailUnreadTwoToneIcon from "@mui/icons-material/MarkEmailUnreadTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
const CLOUD = "https://res.cloudinary.com/drezpxdjw/image/upload";

let data_product = [
  {
    id: 1,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_1.png`,
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 2,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_2.png`,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 3,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_3.png`,
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 4,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_4.png`,
    new_price: 100.0,
    old_price: 150.0,
  },
  {
    id: 5,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_5.png`,
    new_price: 100.0,
    old_price: 150.0,
  },
  {
    id: 6,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_6.png`,
    new_price: 100.0,
    old_price: 150.0,
  },
];

export const sidebarMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <GridViewTwoToneIcon fontSize="medium" />,
  },

  {
    title: "Categories",
    href: "/category",
    icon: <CategoryTwoToneIcon fontSize="medium" />,
    submenu: [
      {
        title: "Add Category",
        href: "/category/add",
      },
      {
        title: "Edit Category",
        href: "/category/edit",
      },
    ],
  },
  {
    title: "Products",
    href: "/products/list",
    icon: <FaProductHunt fontSize={23} />,
    submenu: [
      {
        title: "Add Products",
        href: "/products/add",
      },
      {
        title: "Edit Products",
        href: "/products/edit",
      },
      {
        title: "Delete Products",
        href: "/products/delete",
      },
    ],
  },
  {
    title: "Customers",
    href: "/customers",
    icon: <PeopleAltTwoToneIcon fontSize="medium" />,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: <ShoppingCartTwoToneIcon fontSize="medium" />,
  },
  {
    title: "Mails",
    href: "/mails",
    icon: <MarkEmailUnreadTwoToneIcon fontSize="medium" />,
  },
  {
    title: "Logout",
    href: "/logout",
    icon: <LogoutTwoToneIcon fontSize="medium" />,
  },
];

// export const ordersData = [
//   {
//     orderId: "8768",
//     customer: {

//     }
//   }
// ]

export default data_product;
