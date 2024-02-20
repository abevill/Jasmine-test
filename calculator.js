window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("calc-form");
    if (form) {
      setupIntialValues();
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        update();
      });
    }
  });
  
  const getCurrentUIValues = () => ({
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  })
  
  const setupIntialValues = () => {
    const values  = { amount: 10000, years: 10, rate: 4.5 };
    const amountUI = document.getElementById("loan-amount");
    amountUI.value = values.amount;
    const yearsUI = document.getElementById("loan-years");
    yearsUI.value = values.years;
    const rateUI = document.getElementById("loan-rate");
    rateUI.value = values.rate;
    update();
  }
  
  const update = () => {
    const currentUIValues = getCurrentUIValues();
    updateMonthly(calculateMonthlyPayment(currentUIValues));
  }
  
  const calculateMonthlyPayment = (values) => {
    const monthlyRate = (values.rate / 100) / 12;
    const n = Math.floor(values.years * 12);
    return (
      (monthlyRate * values.amount) /
      (1 - Math.pow((1 + monthlyRate), -n))
    ).toFixed(2);
  }
  
  const updateMonthly = (monthly) => {
    const monthlyUI = document.getElementById("monthly-payment");
    monthlyUI.innerText = `$${monthly}`;
  }
  