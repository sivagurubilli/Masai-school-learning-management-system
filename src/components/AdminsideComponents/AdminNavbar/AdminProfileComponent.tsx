import React, { useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Box, Text, Divider } from "@chakra-ui/react";

// this component is for when clicking on user name in navbar this component will display
interface ProfilecomponentProps {
  setshow1: (show: boolean) => void;
}

const AdminProfileComponent = ({ setshow1 }: ProfilecomponentProps) => {
   const navigate = useNavigate()

   const bodyRef = useRef(document.body);

   useEffect(() => {
     bodyRef.current.addEventListener('click', handleBodyClick);
     return () => {
       bodyRef.current.removeEventListener('click', handleBodyClick);
     };
   }, []);
 
   function handleBodyClick() {
    setshow1(false)
   }
  const Logout =()=>{
    localStorage.clear()
    setshow1(false)
    navigate("/admin/login")
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      position="absolute"
      width="200px"
      height="auto"
      marginTop="-10px"
      marginLeft="82%"
      border="1px solid #778087"
      borderRadius="5px"
      boxShadow="0 5px 15px rgba(0,0,0,0.06)"
      backgroundColor="white"
      p={3}
      zIndex="1"
    >
      <Text color="#778087" fontSize="sm" padding="5px">
        Manage Access
      </Text>
      <Text color="black" padding="5px">
        <Link to="/admin/profile" onClick={() => setshow1(false)}>
          Profile
        </Link>
      </Text>
      <Text color="black" padding="5px">
        <Link to="admin/transcript" onClick={() => setshow1(false)}>
          Transcript{" "}
        </Link>
      </Text>
      <Divider borderColor="gray.300" />
      <Text color="black" padding="10px"  _hover={{"cursor":"pointer"}} onClick={Logout}>
        Logout
      </Text>
    </Box>
  );
};

export default AdminProfileComponent;
