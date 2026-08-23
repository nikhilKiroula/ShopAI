import api from "./api.service";

export const createPaymentOrder = async (orderId) => {
  const response = await api.post("/payments/create", { orderId });
  return response.data.data;
};

export const verifyPayment = async (paymentDetails) => {
  const response = await api.post("/payments/verify", paymentDetails);
  return response.data.data;
};

export const openRazorpayCheckout = (payment) =>
  new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error("Razorpay Checkout could not be loaded"));
      return;
    }

    const checkout = new window.Razorpay({
      key: payment.keyId,
      amount: payment.amount,
      currency: payment.currency,
      name: "ShopAI",
      description: "Order payment",
      order_id: payment.razorpayOrderId,
      handler: resolve,
      modal: {
        ondismiss: () => reject(new Error("Payment was cancelled")),
      },
    });

    checkout.on("payment.failed", (response) => {
      reject(new Error(response.error?.description || "Payment failed"));
    });

    checkout.open();
  });
