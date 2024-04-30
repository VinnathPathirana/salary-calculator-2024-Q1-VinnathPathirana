import DisplaySalary from "../Components/DisplaySalary/DisplaySalary";
import CalSalary from "../Components/CalculateSalary/CalSalary";
import { Flex } from "@mantine/core";

const DisplayPage = () => {
  return (
    <Flex
      mih={50}
      gap="sm"
      justify="center"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
        <CalSalary/>
        <DisplaySalary/>
        



    </Flex>
  );
};

export default DisplayPage;
