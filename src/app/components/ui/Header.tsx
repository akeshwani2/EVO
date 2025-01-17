import React from "react";

const Header = () => {
  return (
    <header className='w-full bg-black'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <nav className='flex items-center justify-between'>
          <div className='flex items-center gap-8'>
            <div className='text-white font-bold'>AXIS</div>
            <a href="/dashboard" className='text-white hover:text-gray-300'>Dashboard</a>
            
            <a href="/docs" className='text-white hover:text-gray-300'>Docs</a>

            <a href="/faqs" className='text-white hover:text-gray-300'>FAQs</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
