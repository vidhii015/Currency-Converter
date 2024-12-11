// URL of the API providing the exchange rates for EUR (Euro)
const url = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

const select = document.getElementsByName("to")[0];
const msg = document.getElementsByClassName("msg")[0];
const amountInput = document.getElementsByName("amount")[0];
const btn = document.getElementsByClassName("btn")[0];
const img = document.getElementsByClassName("img")[0];

// Function to populate currency options and handle conversions
function options() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      Object.keys(data.eur)
        .slice(3)
        .forEach((currencyKey) => {
          // Create a new option element for each currency and add it to the dropdown
          const option = document.createElement("option");
          option.innerText = currencyKey.toUpperCase();
          option.value = currencyKey.toLowerCase();
          select.append(option);
        });

      // Set INR as the default selected currency
      select.value = "inr";

      // Function to update the country flag based on the selected currency
      function updateFlag() {
        const countryCode = select.value.slice(0, 2).toUpperCase();
        img.setAttribute(
          "src",
          `https://flagsapi.com/${countryCode}/flat/64.png`
        );
      }

      updateFlag();

      // Add an event listener to update the flag when the currency is changed
      select.addEventListener("change", () => {
        updateFlag();
      });

      // Function to calculate the total amount in the selected currency
      function getTotal() {
        let amount = parseFloat(amountInput.value);
        // If the amount is invalid or zero, default to 1
        if (amount <= 0) {
          amount = 1;
        }

        // Calculate the total by multiplying the amount by the exchange rate
        const total = data.eur[select.value] * amount;
        msg.innerText = `${amount} EUR = ${total} ${select.value.toUpperCase()}`;
      }

      getTotal();

      // Event listener for the button to trigger the conversion calculation when clicked
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        getTotal();
      });
    });
}

options();
