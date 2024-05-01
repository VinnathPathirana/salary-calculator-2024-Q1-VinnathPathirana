import { Box, Text } from "@mantine/core";
import styles from "../../Styles/DisplaySalary.module.css";
import { useSalary } from "./SalaryContext";

const DisplaySalary = () => {
  const { allowanceItems, deductionItems, basicSalary } = useSalary();

  // Calculate total allowance amount
  const totalAllowanceAmount = allowanceItems.reduce(
    (acc, item) => acc + parseFloat(item.amount || "0"),
    0
  );
  //  console.log("Total Allownace Amount",totalAllowanceAmount)

  //Calcualte Total Deduction Amount
  const totalDeductionAmount = deductionItems.reduce(
    (acc, item) => acc - parseFloat(item.amount || "0"),
    0
  );
  //  console.log("Total Deduction Amount",totalDeductionAmount)

  //  console.log(parseFloat(basicSalary) + totalAllowanceAmount)

  // Calculate gross salary
  const grossSalary = parseFloat(basicSalary) + totalAllowanceAmount - -totalDeductionAmount;

  //  console.log("Gross salary",grossSalary)

  const SumofEPT = allowanceItems.reduce((acc, item) => {
    if (item.isCheckedETF) {
      return acc + parseFloat(item.amount);
    } else {
      return acc + 0;
    }
  }, 0);

  console.log(SumofEPT);

  //calculate the Total Earnings for EPF
  const totalEarningEPF =  parseFloat(basicSalary) + SumofEPT;
  console.log("totalEarningEPF",totalEarningEPF);

  //Calculate the Gross Salary For EPF
  const grossSalaryForEPF = totalEarningEPF - (-totalDeductionAmount);
  console.log("gross salary EPF",grossSalaryForEPF);

  //calculate the Employee EPF (8%)
  const employeeEPF = grossSalaryForEPF * 8/100;
  console.log("employeeEPF",employeeEPF);

  //calcualte the Employer EPF (12%)
  const employerEPF = grossSalaryForEPF * 12/100;
  console.log("employerEPF",employerEPF);




  return (
    <Box className={styles.Box}>
      <h4 className={styles.heading}>Your Salary</h4>

      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <Text pb={"16px"}>
            <Text c="dimmed">
              Items <br />{" "}
            </Text>
          </Text>
          <Text>
            {" "}
            Basic Salary <br />
          </Text>
          Gross Earning <br />
          Gross Deduction <br />
          Employee EPF (%8) <br />
          APIT <br />
        </span>
        <span style={{ textAlign: "right" }}>
          <Text pb={"16px"}>
            <Text c="dimmed">
              Amount <br />{" "}
            </Text>
          </Text>
          {basicSalary + ".00"} <br />
          {grossSalary.toFixed(2)}
          <br />
          {totalDeductionAmount.toFixed(2)} <br />
          {employeeEPF.toFixed(2)}<br />
          -3740.00 <br />
        </span>
      </Box>

      <Box className={styles.boxStyle}>
        <span>Net Salary (Take Home) </span>
        136,100.00
      </Box>

      <Text c="dimmed">Contribution from the Employer</Text>

      <Box className={styles.boxStyle}>
        <span>
          Employeer EPF (12%) <br />
          Employeer ETF (3%) <br />
          <Text style={{ paddingTop: "25px" }}>CTC (Cost to Company) </Text>
        </span>

        <span style={{ textAlign: "right" }}>
          18,240.00 <br />
          4560.00 <br />
          <Text style={{ paddingTop: "25px" }}>174,800.00</Text>
        </span>
      </Box>
    </Box>
  );
};

export default DisplaySalary;
