import currencies, { rates, pointsMultiplier } from "./currencies";

export const convertPrice = (price, currency, withLabel = true) => {
    const converted = currency !== "KRW" ? price * rates[currency] : price;
    return formatPrice(converted, currency, withLabel);
};

const formatPrice = (price, currency, withLabel = true) =>
    `${withLabel ? currencies[currency].symbol : ""}${Number(
        parseFloat(price).toFixed(2)
    ).toLocaleString("en")}`;

export const getPoints = (amount, currency) => {
    const points = Math.round(amount / 5000) * pointsMultiplier[currency];
    return formatPrice(points, currency);
};

export const getCartProductCount = (cart) =>
    cart.reduce((a, b) => Number(a) + Number(b.qty), 0);

export const groupCartOrdersByShippingDate = (cart) => {
    const groups = {};

    cart.forEach((p) => {
        const shippingDate = p.product.shippingDate.split("T")[0];
        const date =
            new Date(shippingDate) > Date.now()
                ? new Date(shippingDate).toLocaleDateString()
                : "soon";
        groups[date] = groups[date] ? [...groups[date], p] : [p];
    });

    return groups;
};

export const getOrderSummary = (cart, selected, cash, currency, shipToSK) => {
    const selectedItems = cart.filter((c) => selected.includes(c.id));
    const grouped = groupCartOrdersByShippingDate(selectedItems);

    const itemsCount = cart.reduce(
        (a, b) =>
            selected.includes(b.id) ? Number(a) + Number(b.qty) : Number(a),
        0
    );

    const subtotal = cart.reduce(
        (a, b) =>
            selected.includes(b.id)
                ? Number(a) + Number(b.qty * b.product.price)
                : a,
        0
    );
    const shippingFee = shipToSK
        ? 0
        : 26780 * Object.keys(grouped).length + itemsCount * 1200;
    const total = subtotal + shippingFee - cash;

    return {
        total: formatPrice(total, currency),
        subtotal: formatPrice(subtotal, currency),
        shippingFee: formatPrice(shippingFee, currency),
        cashToEarn: getPoints(subtotal, currency),
        itemsCount,
    };
};
