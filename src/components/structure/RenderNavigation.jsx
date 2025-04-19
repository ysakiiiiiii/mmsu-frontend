import { Link, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav,button } from "./navigation";
import { PiHorseLight } from "react-icons/pi";
import { GoHeart } from 'react-icons/go';
import { GiShoppingCart } from 'react-icons/gi';
import { BsPerson } from "react-icons/bs";
import IconButton from './IconButtons';

export const RenderRoutes = () => {
  const { user } = AuthData();
  const userRole = user.isAuthenticated ? user.role : "guest";

  return (
    <Routes>
      {nav.map((r, i) =>
        r.role.includes(userRole) ? (
          <Route key={i} path={r.path} element={r.element} />
        ) : null
      )}

      {button.map((items) =>
          <Route key={items.id} path={items.path} element={items.element} />
     )}
    </Routes>
  );
};

export const RenderMenu = () => {
     const { user, logout } = AuthData();
     const navigate = useNavigate();
     const userRole = user.isAuthenticated ? user.role : "guest";
     
     const handleLogout = () => {
       logout();
       navigate("/");
     };

     const MenuItem = ({ r }) => (
       <li>
         <Link
           to={r.path}
           className="inline-block py-1 px-3 hover:text-green-700 font-medium transform transition-transform duration-300 hover:scale-105"
         >
           {r.name}
         </Link>
       </li>
     );
   
     return (
    
     <nav className="flex justify-center bg-white py-2 font mt-4 mb-3">

       <div className="w-full max-w-full h-10 mx-30 px-4 grid grid-cols-[1.5fr_2fr_1.5fr] items-center">
         {/* Logo Section */}
          <div className="relative flex items-center gap-2 font-bold font-Lena">
               {/* Horse Icon */}
               <PiHorseLight className="text-green-900 text-4xl" />

               {/* Logo Text */}
               <div className="flex flex-col leading-tight">
                    <div className="flex gap-1 text-2xl">
                         <p className="hover:text-yellow-500 transition">MMSU</p>
                         <p className="text-green-800">merch</p>
                    </div>

                    {user.isAuthenticated && user.role === "private" && (
                         <p className="absolute top-5 mt-1 text-xs text-black font-normal font-Poppins">
                         Hello, <span className="font-semibold">{user.name}</span>! 🎉
                         </p>
                    )}
               </div>
          </div>


   
         {/* Navigation Links */}
         <nav className="hidden md:flex justify-center font-Poppins text-sm">
           <ul className="flex items-center gap-15">
             {nav.map((r, i) =>
               r.isMenu && r.role.includes(userRole) ? (
                 <MenuItem key={i} r={r} />
               ) : null
             )}
           </ul>
         </nav>
   
         {/* Icons + Auth */}
         <div className="flex justify-end items-center gap-4 font-Poppins">
           {user.isAuthenticated && user.role === "private" && (
             <>
               <IconButton icon={BsPerson} to='/user'tooltip="View Profile" />
               <IconButton icon={GoHeart} to="/favorites" tooltip="Favorites" />
               <IconButton icon={GiShoppingCart} to="/cart" tooltip="Cart" />
             </>
           )}
   
           {user.isAuthenticated ? (
             <button
               type="button"
               onClick={handleLogout}
               className="text-sm text-green-800 hover:text-red-600 font-semibold ml-2"
               >
             Log out
           </button>
           ) : (
             <Link
               to="/login"
               className="text-sm text-green-800 hover:text-green-600 font-semibold ml-2"
             >
               Log in
             </Link>
           )}
         </div>
       </div>
     </nav>
     );
   };
   