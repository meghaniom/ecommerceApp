import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white border-t mt-16 p-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </footer>
    </div>
  );
};

export default Footer;
