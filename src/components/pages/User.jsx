import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthWrapper";
import ProtectedRouting from "../../auth/ProtectedRouting";
import PersonInfo from "../structure/UserDetails/PersonInfo";
import AddressSection from "../structure/UserDetails/Address";
import PaymentSection from "../structure/UserDetails/Payment";
import OrderSummarySection from "../structure/UserDetails/Order";
import SecuritySection from "../structure/UserDetails/Security";
import UserProfileSection from "../structure/UserDetails/UserProfileSection";

const Account = () => {
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [profile, setProfile] = useState({

  });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <ProtectedRouting>
      <div className="font-Poppins max-w-7xl mx-auto p-6 grid gap-8">
        <PersonInfo/>
         <UserProfileSection userId={user.id}  />
         <AddressSection 
          userId={user.id} 
          profile={profile}
          handleInputChange={handleInputChange}
        />
        <PaymentSection userId={user.id} />
        <OrderSummarySection
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <SecuritySection />
      </div>
    </ProtectedRouting>
  );
};

export default Account;
