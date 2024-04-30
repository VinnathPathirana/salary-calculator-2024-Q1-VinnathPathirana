import React, { useState } from "react";
import {
  Flex,
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

const CalSalary = () => {
  const [allowanceItems, setAllowanceItems] = useState([
    { title: "", amount: "" },
  ]);
  const [deductionItems, setDeductionItems] = useState([
    { title: "", amount: "" },
  ]);
  const [error, setError] = useState<{
    errorIndex: number | null;
    errorMessage: string;
  }>({
    errorIndex: null,
    errorMessage: "",
  });

  const handleAddAllowance = () => {
    if (
      allowanceItems.some((item) => item.title === "" || item.amount === "")
    ) {
      setError({
        errorIndex: allowanceItems.findIndex(
          (item) => item.title === "" || item.amount === ""
        ),
        errorMessage: "All fields must be filled",
      });
    } else {
      setAllowanceItems([...allowanceItems, { title: "", amount: "" }]);
      setError({ errorIndex: null, errorMessage: "" });
    }
  };

  const handleAddDeduction = () => {
    setDeductionItems([...deductionItems, { title: "", amount: "" }]);
  };

  const handleInputChange = (
    index: number,
    field: "title" | "amount",
    value: string,
    type: "allowance" | "deduction"
  ) => {
    if (type === "allowance") {
      const updatedItems = [...allowanceItems];
      updatedItems[index][field] = value;
      setAllowanceItems(updatedItems);
    } else if (type === "deduction") {
      const updatedItems = [...deductionItems];
      updatedItems[index][field] = value;
      setDeductionItems(updatedItems);
    }
  };

  const handleReset = () => {
    setAllowanceItems([{ title: "", amount: "" }]);
    setDeductionItems([{ title: "", amount: "" }]);
    setError({ errorIndex: null, errorMessage: "" });
  };

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
        <Input className={styles.inputbox} />
        <Text className={styles.text}>Earnings </Text>
        <Text c="dimmed" size="12px" pb={"20px"}>
          Allowance, Fixed Allowance, Bonus and etc.
        </Text>

        {/* Start */}
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
                <Checkbox defaultChecked label="EPF/ETF" />
              </Grid.Col>
            </div>
          </Grid>
        ))}

        {/* End */}
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
