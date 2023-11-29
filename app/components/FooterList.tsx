import React from "react";

interface FooterListProps {
  children: React.ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full gap-2 mb-6 sm:w-1/2 md:w-1/4 lg:w-1/6">
      {children}
    </div>
  );
};

export default FooterList;
