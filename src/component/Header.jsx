import MainHeader from "./MainHeader";
import TopHeader from "./TopHeader";
/* eslint-disable react/prop-types */

const Header = ({ cartHandler, cartOpen }) => {
  return (
    <>
      {/* <TopHeader /> */}
      <MainHeader
       cartHandler={cartHandler} 
       cartOpen={cartOpen} />
    </>
  );
};

export default Header;




