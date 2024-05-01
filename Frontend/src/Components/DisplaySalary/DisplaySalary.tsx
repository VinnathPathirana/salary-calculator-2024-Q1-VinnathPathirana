import { Box, Text } from "@mantine/core";
import styles from "../../Styles/DisplaySalary.module.css";
import { useSalary } from "./SalaryContext";

const DisplaySalary = () => {
  const { allowanceItems, deductionItems, basicSalary } = useSalary();

  // Calculate total allowance amount
  const totalAllowanceAmount = allowanceItems.reduce(
    (acc, item) => acc + parseFloat(item.amount || "0"),0
  );


  //Calcualte Total Deduction Amount
  const totalDeductionAmount = deductionItems.reduce(
    (acc, item) => acc - parseFloat(item.amount || "0"), 0
  );

  // Calculate gross salary
  const grossSalary =parseFloat(basicSalary) + totalAllowanceAmount - -totalDeductionAmount;


  const SumofEPT = allowanceItems.reduce((acc, item) => {
    if (item.isCheckedETF) {
      return acc + parseFloat(item.amount);
    } else {
      return acc + 0;
    }
  }, 0);


  //calculate the Total Earnings for EPF
  const totalEarningEPF = parseFloat(basicSalary) + SumofEPT;

  //Calculate the Gross Salary For EPF
  const grossSalaryForEPF = totalEarningEPF - -totalDeductionAmount;

  //calculate the Employee EPF (8%)
  const employeeEPF = (grossSalaryForEPF * 8) / 100;

  //calcualte the Employer EPF (12%)
  const employerEPF = (grossSalaryForEPF * 12) / 100;

  //calculate the Employer ETF (3%)
    const employerETF = (grossSalaryForEPF * 3) / 100;

 //calculate the Cost To Company
   const costToCompany = grossSalary + employerEPF + employerETF;

   // Calculate the Gross Earnings for APIT
  const grossEarningsForAPIT = grossSalary;

  // Calculate APIT based on the provided rules
  let APIT;
  if (grossEarningsForAPIT <= 100000) {
    APIT = 0;
  } else if (grossEarningsForAPIT <= 141667) {
    APIT = (grossEarningsForAPIT * 0.06) - 6000;
  } else if (grossEarningsForAPIT <= 183333) {
    APIT = (grossEarningsForAPIT * 0.12) - 14500;
  } else if (grossEarningsForAPIT <= 225000) {
    APIT = (grossEarningsForAPIT * 0.18) - 25500;
  } else if (grossEarningsForAPIT <= 266667) {
    APIT = (grossEarningsForAPIT * 0.24) - 39000;
  } else if (grossEarningsForAPIT <= 308333) {
    APIT = (grossEarningsForAPIT * 0.30) - 55000;
  } else {
    APIT = (grossEarningsForAPIT * 0.36) - 73500;
  }

  //calculate Net Salary
  const netSalary  = grossSalary - employerEPF - APIT;

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
          -{employeeEPF.toFixed(2)}
          <br />
          -{APIT.toFixed(2)} <br />
        </span>
      </Box>

      <Box className={styles.boxStyle}>
        <span><Text style={{fontFamily: 'Inter', fontWeight: 600, fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.1px'}} >Net Salary (Take Home)</Text> </span>
       { netSalary.toFixed(2)}
      </Box>

      <Text c="dimmed">Contribution from the Employer</Text>

      <Box className={styles.boxStyle}>
        <span>
          Employeer EPF (12%) <br />
          Employeer ETF (3%) <br />
          <Text style={{ paddingTop: "25px" }}>CTC (Cost to Company) </Text>
        </span>

        <span style={{ textAlign: "right" }}>
          {employerEPF.toFixed(2)} <br />
          {employerETF.toFixed(2)} <br />
          <Text style={{ paddingTop: "25px" }}>{costToCompany.toFixed(2)}</Text>
        </span>
      </Box>
    </Box>
  );
};

export default DisplaySalary;
