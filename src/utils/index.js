import axios from "axios";

export const convertCurrency = (base, to, amount) => {
    axios
        .get(
            `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${to}`
        )
        .then((response) => (response.rates[to] * amount).toFixed(2));
};

export const getPoints = (amount) => Math.round(amount / 5000) * 50;
