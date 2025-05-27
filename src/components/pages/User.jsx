import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthWrapper";
import ProtectedRouting from "../../auth/ProtectedRouting";
import PersonInfo from "../structure/UserDetails/PersonInfo";
import AddressSection from "../structure/UserDetails/Address";
import PaymentSection from "../structure/UserDetails/Payment";
import OrderSummarySection from "../structure/UserDetails/Order";
import ProfileStatsSection from "../structure/UserDetails/Profile";
import ReviewsSection from "../structure/UserDetails/Reviews";
import SecuritySection from "../structure/UserDetails/Security";

const Account = () => {
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [profile, setProfile] = useState({
    name: user.name,
    email: "dummy_accountniJuan@gmail.com",
    phone: "09123456789",
    creationDate: "2023-12-23",
    membership: "Gold",
    location: "Philippines, Ilocos Norte",
    about:
      "I’m a web designer, I work in programs like Figma and member of Nazi",
    country: "Philippines",
    city: "Ilocos Norte",
    zip: "2916",
  });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <ProtectedRouting>
      <div className="font-Poppins max-w-7xl mx-auto p-6 grid gap-8">
        <PersonInfo/>
        <AddressSection
          profile={profile}
          handleInputChange={handleInputChange}
        />
        <PaymentSection />
        <OrderSummarySection
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ProfileStatsSection />
        <ReviewsSection />
        <SecuritySection />
      </div>
    </ProtectedRouting>
  );
};

export default Account;
