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

export const groupCartOrdersByShippingDate = (cart) => {
    const groups = { soon: [] };

    cart.forEach((p) => {
        const shippingDate = p.product.shippingDate.split("T")[0];
        if (new Date(shippingDate) > Date.now()) {
            const date = new Date(shippingDate).toLocaleDateString();
            groups[date] = groups[date] ? [...groups[date], p] : [p];
        } else {
            groups.soon = [...groups.soon, p];
        }
    });

    return groups;
};

export const getSelectedItemsCount = (cart, selected) =>
    cart.reduce(
        (a, b) =>
            selected.includes(b.id) ? Number(a) + Number(b.qty) : Number(a),
        0
    );
