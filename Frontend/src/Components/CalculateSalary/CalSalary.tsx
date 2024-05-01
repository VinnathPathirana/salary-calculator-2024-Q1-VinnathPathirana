import {
  Box,
  Input,
  Checkbox,
  CloseButton,
  Grid,
  Text,
  Button,
} from "@mantine/core";
import { IconXboxX, IconPlus } from "@tabler/icons-react";
import styles from "../../Styles/CalSalary.module.css";
import Iconcolor from "../../assets/Iconcolor.png";
import { useSalary } from '../DisplaySalary/SalaryContext';

 const CalSalary = () => {

    const {
        allowanceItems,
        deductionItems,
        error,
        basicSalary,
        setBasicSalary,
        handleETFChange,
        handleAddAllowance,
        handleAddDeduction,
        handleInputChange,
        handleReset,
        
      } = useSalary();

      

  return (
    <div>
      <Box className={styles.Box}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 className={styles.heading}>Calculate Your Salary</h4>
          <img src={Iconcolor} style={{ marginLeft: "340px" }} alt="icon" />
          <Button onClick={handleReset} style={{   border: "none",
              backgroundColor: " #E0E0E0",
              color: "#0052EA",  }}>
            Reset
          </Button>
        </div>

        <Text className={styles.text}>Basic Salary</Text>
        <Input
          className={styles.inputbox}
          value={basicSalary} 
          onChange={(event) => setBasicSalary(event.target.value)} 
        />
        <Text className={styles.text}>Earnings </Text>
        <Text c="dimmed" size="12px" pb={"20px"}>
          Allowance, Fixed Allowance, Bonus and etc.
        </Text>

       
        {allowanceItems.map((item, index) => (
          <Grid key={index}>
            <div className={styles.inputContainer}>
              <Grid.Col span={6}>
                <Input
                  className={styles.inputbox2}
                  placeholder="Pay Details (Title)"
                  value={item.title}
                  onChange={(event) =>
                    handleInputChange(
                      index,
                      "title",
                      event.target.value,
                      "allowance"
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col span={6} style={{ marginLeft: "-20px" }}>
                <Input
                  className={styles.inputbox3}
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(event) =>
                    handleInputChange(
                      index,
                      "amount",
                      event.target.value,
                      "allowance"
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col
                span={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "-20px",
                }}
              >
                <CloseButton icon={<IconXboxX size={20} stroke={1.5} />} />
                <Checkbox  label="EPF/ETF" checked={item.isCheckedETF} onChange={() => handleETFChange(index)}/>
              </Grid.Col>
            </div>
          </Grid>
        ))}

        
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="default"
            leftSection={<IconPlus color="blue" />}
            color="blue"
            style={{
              border: "none",
              backgroundColor: " #E0E0E0",
              color: "#0052EA",
            }}
            onClick={handleAddAllowance}
          >
            Add New Allowance
          </Button>
          {error.errorIndex !== null && (
            <p style={{ color: "red", marginLeft: "5px" }}>
              {error.errorMessage}
            </p>
          )}
        </div>

        <hr />

        <Text className={styles.text}>Deductions </Text>

        <Text c="dimmed" size="12px" pb={"20px"}>
          Salary Advances, Loan Deductions and all
        </Text>

        {deductionItems.map((item, index) => (
          <Grid key={index}>
            <div className={styles.inputContainer}>
              <Grid.Col span={6}>
                <Input
                  className={styles.inputbox2}
                  placeholder="Pay Details (Title)"
                  value={item.title}
                  onChange={(event) =>
                    handleInputChange(
                      index,
                      "title",
                      event.target.value,
                      "deduction"
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Input
                  className={styles.inputbox3}
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(event) =>
                    handleInputChange(
                      index,
                      "amount",
                      event.target.value,
                      "deduction"
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col>
                <CloseButton icon={<IconXboxX size={20} stroke={1.5} />} />
              </Grid.Col>
            </div>
          </Grid>
        ))}

        <Button
          variant="default"
          leftSection={<IconPlus color="blue" />}
          color="blue"
          style={{
            border: "none",
            backgroundColor: " #E0E0E0",
            color: "#0052EA",
          }}
          onClick={handleAddDeduction}
        >
          Add New Deduction
        </Button>
      </Box>
    </div>
  );
};

export default CalSalary;
