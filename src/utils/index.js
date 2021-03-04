import currencies, { rates, pointsMultiplier } from "./currencies";

export const convertPrice = (
    price,
    currency,
    withLabel = true,
    raw = false
) => {
    const converted = currency !== "KRW" ? price * rates[currency] : price;
    return formatPrice(converted, currency, withLabel, raw);
};

const formatPrice = (price, currency, withLabel = true, raw = false) =>
    raw
        ? price
        : `${withLabel ? currencies[currency].symbol : ""}${Number(
              parseFloat(price).toFixed(2)
          ).toLocaleString("en")}`;

export const getPoints = (amount, currency, withLabel = true, raw = false) => {
    const points = Math.round(amount / 5000) * pointsMultiplier[currency];
    return formatPrice(points, currency, withLabel, raw);
};

export const getCartProductCount = (cart) =>
    cart.reduce((a, b) => Number(a) + Number(b.qty), 0);

export const groupCartOrdersByShippingDate = (cart, selected) => {
    const groups = {};
    const newCart = selected
        ? cart.filter((c) => selected.includes(c.id))
        : cart;
    newCart.forEach((p) => {
        const shippingDate = p.product.shippingDate.split("T")[0];
        const date =
            new Date(shippingDate) > Date.now()
                ? new Date(shippingDate).toLocaleDateString()
                : "soon";
        groups[date] = groups[date] ? [...groups[date], p] : [p];
    });

    return groups;
};

const getTotal = (arr, currency, cash = 0) => {
    let total = Object.keys(arr).reduce(
        (a, b) => Number(a) + Number(arr[b]),
        0
    );
    total -= cash;
    return formatPrice(total, currency);
};

export const getOrderSummary = (cart, selected, cash, currency, shipToSK) => {
    const grouped = groupCartOrdersByShippingDate(cart, selected);
    const itemsCount = {};
    const subtotal = {};
    const shippingFee = {};
    const total = {};
    const cashToEarn = {};
    const cashUsed = {};
    let remainingCash = Number(cash);

    Object.keys(grouped).forEach((group) => {
        itemsCount[group] = grouped[group].reduce(
            (a, b) =>
                selected.includes(b.id) ? Number(a) + Number(b.qty) : Number(a),
            0
        );

        subtotal[group] = grouped[group].reduce(
            (a, b) =>
                selected.includes(b.id)
                    ? Number(a) + Number(b.qty * b.product.price)
                    : a,
            0
        );

        shippingFee[group] = shipToSK ? 0 : 26780 + itemsCount[group] * 1200;
        total[group] = subtotal[group] + shippingFee[group];
        cashToEarn[group] = getPoints(subtotal[group], currency, false, true);

        if (total[group] > remainingCash && remainingCash > 0) {
            cashUsed[group] = remainingCash;
            remainingCash = 0;
        } else {
            cashUsed[group] = 0;
        }
    });

    itemsCount.overall = getTotal(itemsCount, currency);
    subtotal.overall = getTotal(subtotal, currency);
    shippingFee.overall = getTotal(shippingFee, currency);
    total.overall = getTotal(total, currency, cash);
    cashToEarn.overall = getTotal(cashToEarn, currency);

    return {
        total,
        subtotal,
        shippingFee,
        cashToEarn,
        itemsCount,
        cashUsed,
    };
};

export const generateOrderId = () => {
    var result = "WVRS-";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * 62));
    }
    return result;
};
