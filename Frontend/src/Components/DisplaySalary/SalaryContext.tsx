import React, { createContext, useState, useContext, ReactNode } from "react";

interface AllowanceItem {
  title: string;
  amount: string;
}

interface Earnings extends AllowanceItem {
  isCheckedETF: boolean;
}

type ErrorState = {
  errorIndex: number | null;
  errorMessage: string;
};

type ContextValue = {
  allowanceItems: Earnings[];
  deductionItems: AllowanceItem[];
  error: ErrorState;
  basicSalary: string; // Add basicSalary state
  handleAddAllowance: () => void;
  handleAddDeduction: () => void;
  handleETFChange: (index: number) => void;
  handleInputChange: (
    index: number,
    field: "title" | "amount",
    value: string,
    type: "allowance" | "deduction"
  ) => void;
  handleReset: () => void;
  setBasicSalary: (value: string) => void; // Add setter function for basicSalary
};

const SalaryContext = createContext<ContextValue>({
  allowanceItems: [],
  deductionItems: [],
  error: { errorIndex: null, errorMessage: "" },
  basicSalary: "", // Initialize basicSalary state
  handleAddAllowance: () => {},
  handleAddDeduction: () => {},
  handleInputChange: () => {},
  handleReset: () => {},
  setBasicSalary: () => {},
  handleETFChange: () => {},
});

export const useSalary = () => useContext(SalaryContext);

type SalaryProviderProps = {
  children: ReactNode;
};

export const SalaryProvider = ({ children }: SalaryProviderProps) => {
  const [allowanceItems, setAllowanceItems] = useState<Earnings[]>([
    { title: "", amount: "", isCheckedETF: false },
  ]);
  const [deductionItems, setDeductionItems] = useState<AllowanceItem[]>([
    { title: "", amount: "" },
  ]);
  const [error, setError] = useState<ErrorState>({
    errorIndex: null,
    errorMessage: "",
  });
  const [basicSalary, setBasicSalary] = useState<string>("0"); // Initialize basicSalary state

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
      setAllowanceItems((prev) => [
        ...prev,
        { title: "", amount: "", isCheckedETF: false },
      ]);
      setError({ errorIndex: null, errorMessage: "" });
    }
  };

  console.log(allowanceItems);
  //   update allowance if ETF or EPF checked
  const handleETFChange = (index: number) => {
    console.log(index);
    const updatedState = allowanceItems.map((item, i) => {
      if (i === index) {
        return { ...item, isCheckedETF: !item.isCheckedETF };
      } else {
        return item;
      }
    });

    setAllowanceItems(updatedState);
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
    setAllowanceItems([{ title: "", amount: "", isCheckedETF: false }]);
    setDeductionItems([{ title: "", amount: "" }]);
    setError({ errorIndex: null, errorMessage: "" });
  };

  //   // Calculate total allowance amount
  //   const totalAllowanceAmount = allowanceItems.reduce((acc, item) => acc + parseFloat(item.amount || '0'), 0);

  const contextValue = {
    allowanceItems,
    deductionItems,
    error,
    basicSalary,
    setBasicSalary,
    handleAddAllowance,
    handleAddDeduction,
    handleInputChange,
    handleReset,
    handleETFChange,
  };

  return (
    <SalaryContext.Provider value={contextValue}>
      {children}
    </SalaryContext.Provider>
  );
};
