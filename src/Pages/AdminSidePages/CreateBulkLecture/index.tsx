import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import "../AdminLecturePage/index.css";
import Navbar from "../../../components/StudentSideComponents/StudentNavbar/Navbar";
import SecondNavforLectureCreate from "../../../components/AdminsideComponents/CreateLecture/SecondNavforCreateLecture";
interface CsvData {
  [key: string]: string;
}

const CreateBulkLecture = () => {
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target) return;
      const content = event.target.result as string;

      const rows = content.trim().split('\n');
      const headers = rows[0].split(',');

      const csvData = rows
        .slice(1)
        .map((row) =>
          row
            .split(',')
            .reduce((obj, value, index) => ({ ...obj, [headers[index]]: value }), {})
        );

      setCsvData(csvData);
    };

    reader.readAsText(file);
  };

  const capitalizeString = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="container">
      <Navbar />
      <SecondNavforLectureCreate />
      <Box
        w={["full", "md"]}
        p="10px 20px 20px 30px"
        mx="auto"
        h="auto"
        mt="30px"
        border={["none"]}
        bg="white"
        borderColor={["", "grey.300"]}
        borderRadius={10}
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Text>Upload csv file to create bulk lectures</Text>
        <Input type="file" id="csvFile" placeholder="Choose csv file lecture uploading" accept=".csv"
        onChange={handleFileUpload} />
        
        <Button
          w="50%"
          mt="20px"
          color="white"
          bg="rgb(31 41 55)"
          _hover={{ bg: "rgb(76, 84, 95)" }}
        >
          {" "}
          create bulk Lectures
        </Button>
        </Box>
        <Flex flexWrap="wrap" >
        <Box mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {Object.keys(csvData[0] || {}).map((header) => (
                <Th border="1px solid grey" key={header}>{capitalizeString(header)}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {csvData.map((row, index) => (
              <Tr key={index}>
                {Object.values(row).map((value, index) => (
                  <Td border="1px solid grey" key={index}>{value}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      </Flex>
    </div>
  );
};

export default CreateBulkLecture;
