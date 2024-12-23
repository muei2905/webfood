import React from "react";
import {
  Drawer,

  Divider,
  useMediaQuery
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  RestaurantMenu as MenuIcon,
  Category as FoodCategoryIcon,
  Kitchen as IngredientsIcon,
  Event as EventsIcon,
  Info as DetailsIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const menu = [
    { title: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { title: "Orders", icon: <OrdersIcon />, path: "/orders" },
    { title: "Menu", icon: <MenuIcon />, path: "/menu" },
    { title: "Food Category", icon: <FoodCategoryIcon />, path: "/category" },
    { title: "Ingredients", icon: <IngredientsIcon />, path: "/ingredients" },
    { title: "Events", icon: <EventsIcon />, path: "/events" },
    { title: "Details", icon: <DetailsIcon />, path: "/details" },
    { title: "Logout", icon: <LogoutIcon />, path: "/" }
  ];
  

const AdminSideBar = () => {
    const isSmallScreen = useMediaQuery("(max-width: 1080px)"); 
    const dispath= useDispatch();
    const navigate= useNavigate();
    const handleNavigate=(item)=>{
        navigate(`/admin/restaurant/${item.path}`)
        if(item.title==="Logout"){
            navigate("/")
        }
    }
  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"} 
      open={true}
      onClose={() => {}}
      sx={{
       zIndex:1
      }}
    >
      <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
        {
            menu.map((item, i)=><><div className="px-5 flex items-center gap-5 cursor-pointer">
                {item.icon}
                <span>{item.title}</span>
               
            </div>
            {i!=menu.length-1 &&<Divider/>}
            </>)
        }
      </div>
    </Drawer>
  );
};

export default AdminSideBar;
