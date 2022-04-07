const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/bfb0686dc231dc9ad165def8/pair/${currency_one}/${currency_two}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((data) => {
      let conversionRate = data.conversion_rate;
      rateEl.innerText = `1 ${currency_one} = ${conversionRate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * conversionRate).toFixed(2);
    })
    .catch((error) => alert(`Oops something went wrong: ${error.message}`));
}

// Swap currencies on button click
function swapCurrencies() {
  let temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
}

// Event listenders
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
swap.addEventListener("click", swapCurrencies);

calculate();
