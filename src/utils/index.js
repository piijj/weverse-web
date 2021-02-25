import axios from "axios";

export const convertCurrency = (base, to, amount) => {
    axios
        .get(
            `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${to}`
        )
        .then((response) => (response.rates[to] * amount).toFixed(2));
};

export const getPoints = (amount) => Math.round(amount / 5000) * 50;

export const getCartProductCount = (cart) =>
    cart.reduce((a, b) => Number(a) + Number(b.qty), 0);

export const getSubtotal = (cart, selected) =>
    cart.reduce(
        (a, b) =>
            selected.includes(b.id)
                ? Number(a) + Number(b.qty * b.product.price)
                : a,
        0
    );
