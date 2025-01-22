"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import { TabList } from "@mui/lab";
import { TabPanel } from "@mui/lab";

const TabsComp = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", margin: 5 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quo
          ea quam. Cupiditate eum ea architecto alias ducimus, praesentium nulla
          dolorem
        </TabPanel>
        <TabPanel value="2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quo
          ea quam. Cupiditate eum ea architecto alias ducimus,
        </TabPanel>
        <TabPanel value="3">
          sectetur adipisicing elit. Repellat quo ea quam. Cupiditate eum ea
          architecto alias ducimus, praesentium nulla dolorem magnam ipsum
          temporibus accusamus eius eos libero magni deleniti!
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabsComp;
