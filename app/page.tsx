import AutoCompleteCom from "./components/AutoCompleteCom";
import SliderCom from "./components/SliderCom";
import DialogCom from "./components/DialogCom";
import AccordianComp from "./components/AccordianComp";
import DrawerComp from "./components/DrawerComp";
import TabsComp from "./components/TabsComp";
import PopoverComp from "./components/PopoverComp";
import SelectCom from "./components/SelectCom";
import TextFieldComponent from "./components/TxtFieldCom";
import DatePickerComp from "./components/DatePickerComp";
import TimePickerComp from "./components/TimePickerComp";

const Home = () => {
  return (
    <>
      <AutoCompleteCom />
      <SliderCom />
      <DialogCom />
      <DatePickerComp />
      <TimePickerComp />
      <TextFieldComponent />
      <PopoverComp />
      <AccordianComp />
      <DrawerComp />
      <SelectCom />
      <TabsComp />
    </>
  );
};

export default Home;
