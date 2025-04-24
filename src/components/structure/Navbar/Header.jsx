import React, { useContext } from 'react';
import { SlSocialInstagram, SlSocialFacebook } from 'react-icons/sl';
import { RiTwitterXFill } from 'react-icons/ri';
import { LiaLinkedinIn } from 'react-icons/lia';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { AuthData } from '../../../auth/AuthWrapper';

// Reusable social icon button
const SocialButton = ({ Icon }) => (
  <div className='w-7 h-7 bg-white rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-130 '>
    <button type='button' className='text-green-800 text-xs '>
      <Icon />
    </button>
  </div>
);

const RenderHeader = () => {
  const { user } = useContext(AuthData); // get user info from context

  return (
    <header className='flex justify-center font bg-green-900 mb-2'>
      <div className='container grid grid-cols-[1fr_2fr_1fr] gap-4 w-full max-w-7xl h-16 px-4'>

        {/* Social Section */}
        <div className='flex items-center gap-4 font-Poppins'>
          <SocialButton Icon={SlSocialInstagram} />
          <SocialButton Icon={SlSocialFacebook} />
          <SocialButton Icon={RiTwitterXFill} />
          <SocialButton Icon={LiaLinkedinIn} />
        </div>

        {/* Centered Tagline */}
        <div className='flex items-center justify-center'>
          <p className='font-Poppins text-xs text-center text-white'>
            Delivering the best clothing merchandise for the Stallions
          </p>
        </div>

        {/* Profile Section */}
        <div className='flex items-center justify-end gap-4'>
          {user.isAuthenticated ? (
            <>
              <p className="font-Poppins text-white text-xs">
                Hello, <span className="font-semibold">{user.name}</span>
              </p>
              <CgProfile className='text-2xl text-white' />
            </>
          ) : (
            <>
              <Link to='/login'>
                <button
                  type="button"
                  className="flex items-center justify-center text-center 
                  font-Poppins text-xs text-green-800 bg-white font-semibold rounded-md border-2 border-white px-6 py-1 
                  transform transition-transform duration-300 hover:scale-110"
                >
                  Sign In
                </button>
              </Link>

              <Link to='/login'>
                <button
                  type="button"
                  className="flex items-center justify-center text-center 
                  font-Poppins text-xs text-white bg-green-800 border-white font-semibold rounded-md border-2 px-6 py-1 
                  transform transition-transform duration-300 hover:scale-110"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default RenderHeader;
