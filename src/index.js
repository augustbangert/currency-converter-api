const API_KEY = "faeb88de4a2346eef68ab677";
const API_ROOT = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

const formElement = document.getElementById("form");
const logElement = document.getElementById("log");
const updateElement = document.getElementById("last-update");

async function getData(url) {
    let data = await fetch(url);
    let json = await data.json();
    return json;
}

async function formWasSubmitted(event) {
    const baseCurrency = document.getElementById("base-currency").value;
    const baseAmount = document.getElementById("base-currency-amount").value;
    const quoteCurrency = document.getElementById("quote-currency").value;
    let dataFromAPI,
        quoteRate,
        calculation,
        convertedAmount,
        lastUpdate,
        nextUpdate;

    event.preventDefault();
    dataFromAPI = await getData(`${API_ROOT}/${baseCurrency}`);
    quoteRate = dataFromAPI.conversion_rates[quoteCurrency];
    calculation = baseAmount * quoteRate;
    convertedAmount = calculation.toFixed(2);

    lastUpdate = dataFromAPI.time_last_update_utc.slice(0, 16);
    nextUpdate = dataFromAPI.time_next_update_utc.slice(0, 16);

    logElement.innerHTML = `${baseAmount} ${baseCurrency} converts to ${convertedAmount} ${quoteCurrency}`;
    updateElement.innerHTML = `Exchange rates last updated ${lastUpdate}. Next scheduled update: ${nextUpdate}.`;
}

formElement.addEventListener("submit", formWasSubmitted);
