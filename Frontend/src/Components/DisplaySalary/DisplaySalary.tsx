import { Box, Text } from "@mantine/core";

import styles from "../../Styles/DisplaySalary.module.css";

const DisplaySalary = () => {
  return (
    <Box className={styles.Box}>
      <h4 className={styles.heading}>Your Salary</h4>

      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
        <Text pb={"16px"}>Items <br/> </Text>
            Basic Salary <br/> 
            Gross Earning <br/>
            Gross Deduction <br/>
            Employee EPF (%8) <br/>
            APIT <br/>

        </span>
        <span style={{textAlign: 'right'}}>
            <Text pb={"16px"}>Amount <br/> </Text>

             150,000.00 <br/>
            160,000.00 <br/>
            -8,000.00 <br/>
            -12,160.00<br/>
            -3740.00 <br/>


        </span>
      </Box>

     

     <Box className={styles.boxStyle}>
     
     <span>Net Salary (Take Home)  </span>
        136,100.00
     </Box>

     <Text c="dimmed" >Contribution from the Employer</Text>

    <Box className={styles.boxStyle}>
     <span>
        Employeer EPF (12%) <br/>
        Employeer ETF (3%) <br/>

        <Text style={{paddingTop:'25px'}}>CTC (Cost to Company) </Text>

     </span>

      <span style={{textAlign: 'right'}}>
        18,240.00 <br/>
        4560.00 <br/>   

        <Text style={{paddingTop:'25px'}}>174,800.00</Text>
     </span>

    
     </Box>

     


    
    </Box>
  );
};

export default DisplaySalary;
