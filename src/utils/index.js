import currencies, { rates, pointsMultiplier } from "./currencies";

export const convertPrice = (price, currency) => {
    const converted = currency !== "KRW" ? price * rates[currency] : price;
    return formatPrice(converted, currency);
};

const formatPrice = (price, currency) =>
    `${currencies[currency].symbol} ${Number(
        parseFloat(price).toFixed(2)
    ).toLocaleString("en")}`;

export const getPoints = (amount, currency) => {
    const points = Math.round(amount / 5000) * pointsMultiplier[currency];
    return formatPrice(points, currency);
};

export const getCartProductCount = (cart) =>
    cart.reduce((a, b) => Number(a) + Number(b.qty), 0);

export const getSubtotal = (cart, selected, currency) => {
    const subtotal = cart.reduce(
        (a, b) =>
            selected.includes(b.id)
                ? Number(a) + Number(b.qty * b.product.price)
                : a,
        0
    );
    return convertPrice(subtotal, currency);
};

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
