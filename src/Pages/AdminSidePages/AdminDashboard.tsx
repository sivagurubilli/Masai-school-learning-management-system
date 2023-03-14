import React from "react";
import "../../App.css";
import Navbar from "../../components/AdminsideComponents/AdminNavbar";
import { Box } from "@chakra-ui/react";

//there is nothing to show in this page from admin side
const AdminDashboard = () => {
  return (
    <div className="container">
      <Navbar />
   <Box  w="100%" bg=" rgb(243,244,246)">
   <Box minH="100px"  w="60%" bg="white" ml="20%" mt="100px" borderRadius="20px" boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">
   </Box>
   </Box >
    </div>
  );
};

export default AdminDashboard;
