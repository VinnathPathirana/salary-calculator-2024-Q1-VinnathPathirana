import DisplaySalary from "../Components/DisplaySalary/DisplaySalary";
import CalSalary from "../Components/CalculateSalary/CalSalary";
import { Flex } from "@mantine/core";
import { SalaryProvider } from "../Components/DisplaySalary/SalaryContext";

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
        <SalaryProvider>
            <CalSalary/>
            <DisplaySalary/>
        </SalaryProvider>
        
    </Flex>
  );
};

export default DisplayPage;
