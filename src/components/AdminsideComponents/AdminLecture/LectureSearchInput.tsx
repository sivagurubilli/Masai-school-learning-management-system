import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Divider,
  Grid,
  Input,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  getBatchArrray,
  getSectionArray,
  getUserArray,
  getTypeArray,
  getCategoryArray,
} from "../../../Services/SelelctionService";
import {
  IBatchObject,
  ISectionObject,
  ITypeObject,
  IUserObject,
} from "../../../Services/SelectionInterface";
import CommonModalComponent from "../../../components/Modal/commonModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { actionCreators } from "../../../redux/SelectionReducer/index";
import { bindActionCreators } from "redux";
import { useSearchParams } from "react-router-dom";
import { LectureSearchService } from "../../../Services/LectureServices";

interface SearchQuery {
  [key: string]: string;
}

const LectureSearchInput = ({ filterValues, setFilterValues ,setLecturesData}: any) => {
  const [batchArray, setBatchArray] = useState<IBatchObject[]>();
  const [sectionArray, setSectionArray] = useState<ISectionObject[]>();
  const [userArray, setUserArray] = useState<IUserObject[]>();
  const [typeArray, setTypeArray] = useState<ITypeObject[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalBody, setModalErrorBody] = useState<string>("");
  const [queryParams] = useSearchParams();
  const dispatch = useDispatch();
  const { GetBatchData, GetSectionData, GetTypeData, GetCategoeryData } =
    bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state: RootState) => state);

  const getArrays = useCallback(async () => {
    try {
      const [batchArray, categoryArray, sectionArray, typeArray, userArray] =
        await Promise.all([
          getBatchArrray(),
          getCategoryArray(),
          getSectionArray(),
          getTypeArray(),
          getUserArray(),
        ]);
      if (batchArray.length) {
        GetBatchData(batchArray);
        setBatchArray(batchArray);
      }

      if (sectionArray.length) {
        GetSectionData(sectionArray);
        setSectionArray(sectionArray);
      }
      if (categoryArray.length) {
        GetCategoeryData(categoryArray);
      }
      if (typeArray.length) {
        GetTypeData(typeArray);
        setTypeArray(typeArray);
      }
      if (userArray.length) {
        setUserArray(userArray);
      }
    } catch (error) {
      setIsOpen(true);
      setModalErrorBody(
        "Oh no! There was a problem with getting the items from the selecting list"
      );
    }
  }, [GetBatchData, GetSectionData, GetTypeData, GetCategoeryData]);

  useEffect(() => {
    const setSelectBatchValues = () => {
      setBatchArray(state.BatchReducer.Batch);
      setSectionArray(state.SectionReducer.Section);
      setTypeArray(state.TypeReducer.Type);
    };
    if (
      state.BatchReducer.Batch.length &&
      state.CategoeryReducer.Categoery.length
    ) {
      setSelectBatchValues();
    } else {
      getArrays();
    }
  }, [
    getArrays,
    state.BatchReducer.Batch,
    state.TypeReducer.Type,
    state.SectionReducer.Section,
    state.CategoeryReducer.Categoery.length,
  ]);

  // Get luctures if any useparams 
  
  // get the values from use params
  useEffect(()=>{
    const title = queryParams.get("title")
   const batch=queryParams.get("batch")
   const  section= queryParams.get("section")
   const type= queryParams.get("type")
    const createdBy= queryParams.get("createdBy")
    const startTime=queryParams.get("startTime")
   const  week=queryParams.get("week")
   const day=queryParams.get("day")

    setFilterValues({...filterValues,title:title,batch:batch,section:section,type:type,
      createdBy:createdBy,startTime:startTime,
    week:week,day:day
    })

  
     },[filterValues,queryParams,setFilterValues,setLecturesData])


  // this function is adding searching values to url
  const useSearch = (): [SearchQuery, (newSearch: SearchQuery) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prevSearchParamsRef = useRef(searchParams.toString());

    useEffect(() => {
      const currentSearchParams = searchParams.toString();
      if (prevSearchParamsRef.current !== currentSearchParams) {
        prevSearchParamsRef.current = currentSearchParams;
      }
    }, [searchParams]);

    const updateSearch = (newSearch: SearchQuery): void => {
      const params = new URLSearchParams(prevSearchParamsRef.current);

      Object.entries(newSearch).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      setSearchParams(params.toString());
    };

    const currentSearch = Array.from(searchParams.entries()).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );

    return [currentSearch, updateSearch];
  };



  // this is setting values from select tags
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    updateSearch({
      ...search,
      [name]: value,
    });
    setFilterValues({ ...filterValues, [name]: value });
  };

  //this is setting values from input elements
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateSearch({
      ...search,
      [name]: value,
    });
    setFilterValues({ ...filterValues, [name]: value });
  };

  const [search, updateSearch] = useSearch();

  const gridColumn = useBreakpointValue({
    base: "1 / -1", // Full width on small screens
    md: "1 / 4", // Span two columns on medium screens
    lg: "1 / 5", // Span two columns starting from the second column on large screens
  });
  const selectWidth = useBreakpointValue({
    base: "100%",
    md: "100%",
    sm: "100%",
  });

  return (
    <div>
      <CommonModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalBody={modalBody}
      />
      <Grid
        templateColumns={{
          base: "1fr 1fr",
        }}
        gap={4}
      >
        <Input
          name="title"
          value={filterValues.title}
          gridColumn={gridColumn}
          placeholder="Enter text"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        mt={4}
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr 1fr 1fr",
          lg: "1fr 1fr 1fr 1fr",
        }}
        gap={4}
      >
        <Select
          name="batch"
          value={filterValues.batch}
          onChange={handleChange}
          width={selectWidth}
          color="rgb(75 85 99)"
          placeholder="Select batch"
        >
          {batchArray?.map((el) => (
            <option key={el.batchId} value={el.batchId}>
              {el.batch}
            </option>
          ))}
        </Select>
        <Select
          name="section"
          width={selectWidth}
          value={filterValues.section}
          color="rgb(75 85 99)"
          placeholder="Select section"
          onChange={handleChange}
        >
          {sectionArray?.map((el) => (
            <option key={el.sectionId} value={el.sectionId}>
              {el.section}
            </option>
          ))}
        </Select>
        <Select
          name="type"
          width={selectWidth}
          color="rgb(75 85 99)"
          value={filterValues.type}
          placeholder="Select type"
          onChange={handleChange}
        >
          {typeArray?.map((el) => (
            <option key={el.id} value={el.id}>
              {el.type}
            </option>
          ))}
        </Select>
        <Input
          type="date"
          name="startTime"
          width={selectWidth}
          color="rgb(75 85 99)"
          value={filterValues.date}
          placeholder="Select date"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        mt={4}
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr",
        }}
        gap={4}
      >
        <Input
          name="week"
          width={selectWidth}
          placeholder="Enter week"
          value={filterValues.week}
          onChange={handleInputChange}
        />
        <Input
          name="day"
          width={selectWidth}
          placeholder="Enter day"
          value={filterValues.day}
          onChange={handleInputChange}
        />
        <Select
          name="user"
          width={selectWidth}
          color="rgb(75 85 99)"
          value={filterValues.user}
          placeholder="Select user"
          onChange={handleChange}
        >
          {userArray?.map((el) => (
            <option key={el.id} value={el.id}>
              {el.user}
            </option>
          ))}
        </Select>
      </Grid>
      <Divider mt="20px" />
    </div>
  );
};

export default LectureSearchInput;
