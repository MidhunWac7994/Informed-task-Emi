import { useState, useEffect } from "react";

const useInstallmentLogic = () => {
  const [recommendedAmount, setRecommendedAmount] = useState(10000);
  const [installmentCount, setInstallmentCount] = useState(11);
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    if (!installmentCount || !recommendedAmount) return;

    const amountPerInstallment =
      parseFloat(recommendedAmount) / installmentCount;
    const newInstallments = Array.from(
      { length: installmentCount },
      (_, index) => ({
        id: index + 1,
        insNumber: String(index + 1),
        checked: false,
        amount: amountPerInstallment.toFixed(2),
        dueDate: "",
        show: true,
        isMerged: false,
        isSplited: false,
      })
    );

    setInstallments(newInstallments);
  }, [recommendedAmount, installmentCount]);

  const toggleInstallmentSelection = (insNumber) => {
    setInstallments((prevInstallments) =>
      prevInstallments.map((installment) =>
        installment.insNumber === insNumber
          ? { ...installment, checked: !installment.checked }
          : installment
      )
    );
  };

  const updateDueDate = (insNumber, date) => {
    setInstallments((prevInstallments) => {
      const updatedInstallments = prevInstallments.map((installment) => {
        if (installment.insNumber === insNumber && installment.show) {
          return { ...installment, dueDate: date };
        }
        return installment;
      });

      if (insNumber === "1" && date) {
        const firstDate = new Date(date);
        for (let i = 1; i < updatedInstallments.length; i++) {
          const currentInstallment = updatedInstallments[i];
          if (currentInstallment.show) {
            const newDate = new Date(firstDate);
            newDate.setMonth(newDate.getMonth() + i);
            updatedInstallments[i] = {
              ...currentInstallment,
              dueDate: `${newDate.getFullYear()}-${String(
                newDate.getMonth() + 1
              ).padStart(2, "0")}-${String(newDate.getDate()).padStart(
                2,
                "0"
              )}`,
            };
          }
        }
      }

      return updatedInstallments;
    });
  };

  const mergeInstallments = () => {
    const selected = installments.filter((inst) => inst.checked);
    if (selected.length < 2) return;

    const sortedSelected = selected.sort((a, b) => 
      Number(a.insNumber) - Number(b.insNumber)
    );
    const firstSelectedId = sortedSelected[0].id;

    const mergedAmount = sortedSelected
      .reduce((sum, inst) => sum + parseFloat(inst.amount), 0)
      .toFixed(2);
    const mergedDueDate = sortedSelected[0].dueDate;

    const newInstallments = installments.map((inst) => {
      if (sortedSelected.some((sel) => sel.insNumber === inst.insNumber)) {
        return { ...inst, show: false, checked: false }; 
      }
      return inst;
    });

    const mergedInstallment = {
      id: firstSelectedId, 
      insNumber: `merged-${sortedSelected
        .map((inst) => inst.insNumber)
        .join("+")}`,
      checked: false,
      amount: mergedAmount,
      dueDate: mergedDueDate,
      show: true,
      isMerged: true,
    };

    const insertPosition = newInstallments.findIndex(
      (inst) => inst.id === firstSelectedId
    );

    newInstallments.splice(insertPosition, 0, mergedInstallment);

    setInstallments(newInstallments);
    console.log("After Merge:", newInstallments);
  };

  const splitInstallment = () => {
    const selected = installments.find((inst) => inst.checked);
    if (!selected) return;

    const splitAmount = (parseFloat(selected.amount) / 2).toFixed(2);
    const splitDueDate = selected.dueDate;

    const newInstallments = installments.map((inst) => {
      if (inst.insNumber === selected.insNumber) {
        return { ...inst, show: false };
      }
      return inst;
    });

    const insertPosition = newInstallments.findIndex(
      (inst) => inst.insNumber === selected.insNumber
    );

    const splitInstallments = [
      {
        id: `${selected.id}-1`,
        insNumber: `${selected.insNumber}.1`,
        checked: false,
        amount: splitAmount,
        dueDate: splitDueDate,
        show: true,
        isSplited: true,
      },
      {
        id: `${selected.id}-2`,
        insNumber: `${selected.insNumber}.2`,
        checked: false,
        amount: splitAmount,
        dueDate: splitDueDate,
        show: true,
        isSplited: true,
      },
    ];

    newInstallments.splice(insertPosition, 0, ...splitInstallments);

    setInstallments(newInstallments);
    console.log("After Split:", newInstallments);
  };

  const handleUndo = (installment) => {
    let newInstallments = [];

    if (installment.isMerged) {
      const originalNumbers = installment.insNumber
        .split("+")
        .map((num) => num.replace("merged-", ""));
      newInstallments = installments
        .map((inst) =>
          originalNumbers.includes(inst.insNumber)
            ? { ...inst, show: true, checked: false }
            : inst.insNumber === installment.insNumber
            ? null
            : inst
        )
        .filter(Boolean);
    } else if (installment.isSplited) {
      console.log("Undoing split operation...");
      const originalNumber = installment.insNumber.split(".")[0];
      newInstallments = installments.map((inst) => {
        if (inst.insNumber === originalNumber) {
          return { ...inst, show: true, checked: false };
        } else if (inst.insNumber.startsWith(`${originalNumber}.`)) {
          return { ...inst, show: false };
        }
        return inst;
      });
      
      const originalInstallment = newInstallments.find(inst => inst.insNumber === originalNumber);
      console.log("Original installment data:", originalInstallment);
      console.log("Original installment restored:", originalNumber);
    } else {
      newInstallments = [...installments];
    }

    setInstallments(newInstallments);
    console.log("After Undo:", newInstallments);
  };

  return {
    recommendedAmount,
    setRecommendedAmount,
    installmentCount,
    setInstallmentCount,
    installments,
    toggleInstallmentSelection,
    updateDueDate,
    mergeInstallments,
    splitInstallment,
    handleUndo,
  };
};

export default useInstallmentLogic;