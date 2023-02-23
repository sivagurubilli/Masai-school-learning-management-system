import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Profilecomponent from "./Profilecomponent";
import { Link, NavLink, NavLinkProps, useNavigate } from "react-router-dom";
import {
  Divider,
  Text,
  Flex,
  Image,
  Box,
  Heading,
  Hide,
  Show,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { masaiimage, NavbarArray } from "../../assets/assets";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState<any | null>(null);
  const navigate = useNavigate()
  const state = useSelector((state: RootState) => state.Authreducer);

  //   this handleclick function for open and closing of side navbar in smaller screens
  const handleclick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) {
      setUserName(name);
    }
  }, [userName]);


  const Logout =()=>{
    localStorage.clear()
       navigate("/login")
  }

  return (
    <Box position="relative" h="auto" top="0" bg="whiteAlpha.900" w="100%">
      <Box boxShadow="sm">
        <Flex
          position={"relative"}
          w={"97%"}
          align="center"
          m="auto"
          h={"60px"}
          justifyContent={"space-between"}
          color={"gray.600"}
        >
          <Flex align="center" flex={"2"}>
            <Link to="/dashboard">
              {" "}
              <Image objectFit="contain" src={masaiimage} alt="Masai logo" />
            </Link>

            {/* navbar part links for each element  */}

            <Hide below="md">
              <Flex w="70%" justifyContent={"space-around"} align="center">
                {NavbarArray.map((el) => (
                  <Box className="li">
                    <NavLink to={"/admin/" + el}>{el}</NavLink>
                  </Box>
                ))}
              </Flex>

              {/*  this part is about display hamburger in menu item for small screeens  */}
              <Box ml={"100px"} onClick={() => setShowProfile(!setShowProfile)}>
                {" "}
                <Button variant={"link"} _hover={{"cursor":"pointer"}}>{userName}</Button>
                <i
                  style={{ marginLeft: "20px" }}
                  className="fa-solid fa-circle-chevron-down"
                ></i>
              </Box>
            </Hide>
          </Flex>
          {/*  this part is about display hamburger  menu item for small screeens  */}

          <Show below="md">
            <Box>
              <i
                id="bar"
                onClick={handleclick}
                className={clicked ? "fas fa-times" : "fas fa-bars"}
              ></i>
            </Box>
          </Show>
        </Flex>
        
        {/* when click on name of user container box dipaly based click action */}
        {showProfile && <Profilecomponent setshow1={setShowProfile} />}

        {/* this is part is like when user enter into smaller screens the navbar appear on left side as side bar  */}

        <Box
          w="100%"
          position="relative"
          id="navbar-mobile"
          className={clicked ? "navbar-mobile active" : "navbar-mobile"}
        >
          {NavbarArray.map((el) => (
            <li>
              <NavLink to={"/admin/" + el}>{el}</NavLink>
            </li>
          ))}
          <Divider borderColor="gray.300" />
          <Text color="black" padding="10px">
            <NavLink to="/admin/profile">Profile</NavLink>
          </Text>
          <Text color="black" padding="10px">
            <NavLink to="/transcript">Transcript </NavLink>
          </Text>
          <Text color="black" padding="10px"  _hover={{"cursor":"pointer"}} onClick={Logout}>
            Logout
          </Text>
          <Divider borderColor="gray.300" />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;