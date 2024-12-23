import React from "react";
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon,
  Event as EventIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../State/Authentication/Action";


const ProfileNavigation = ({open, handleClose}) => {
    const isSmallScreen= useMediaQuery("(max-width:800px)")
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const handleNavigate=(item)=>{
        if(item.title==="Logout"){
          dispatch(logoutUser())
          navigate("/")
        }
        else navigate(`/my-profile/${item.title.toLowerCase()}`)
    }
    const menuItems = [
        { icon: <ShoppingCartIcon />, title: "Orders" },
        { icon: <FavoriteIcon />, title: "Favorites" },
        { icon: <HomeIcon />, title: "Address" },
        { icon: <PaymentIcon />, title: "Payments" },
        { icon: <NotificationsIcon />, title: "Notification" },
        { icon: <EventIcon />, title: "Events" },
        { icon: <ExitToAppIcon />, title: "Logout" },
      ];
  return (
    <div>
     <Drawer variant={isSmallScreen?"temporary":"permanent"} onClose={handleClose} open={isSmallScreen?open:true} anchor="left" sx={{zIndex:-1}}>
        <div className="w-[50vw] lg:w-[20vw] h-[90vh] flex flex-col justify-start text-xl gap-8 mt-10 pt-16">
            {menuItems.map((item, i)=><>
            <div onClick={()=>handleNavigate(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
                {item.icon}
                <span>{item.title}</span>
            </div>
            {i!==menuItems.length-1 && <Divider/>}
            </>)}
        </div>
     </Drawer>
    </div>
  );
};

export default ProfileNavigation;
