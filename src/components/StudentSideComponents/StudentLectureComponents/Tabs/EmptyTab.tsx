import React from 'react'
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";


const EmptyTab = () => {
    return (
        <Tabs isFitted variant="enclosed" mt='50px'>
            <TabList mb="1em" h="40px">
                <Tab
                    _selected={{
                        borderBottomWidth: "2px",
                        borderBottomColor: "#504de6",
                    }}
                    _hover={{ bg: "#f9fafb" }}
                >
                    Details
                </Tab>
                <Tab
                    _selected={{
                        borderBottomWidth: "2px",
                        borderBottomColor: "#504de6",
                    }}
                    _hover={{ bg: "#f9fafb" }}
                >
                    Discussions
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                </TabPanel>
                <TabPanel></TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default EmptyTab