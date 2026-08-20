import api from "@/services/api.service";

const Checkout = () => {
  const [order, setOrder] = useState(null);

  const handlePlaceOrder = async () => {
    const response = await api.post("/orders", {
      addressId: selectedAddressId,
    });

    setOrder(response.data.data);
  };

  const handlePayment = async () => {
    try {
      const response = await api.post("/payments/create", {
        orderId: order._id,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <>
      {/* address UI */}

      {!order ? (
        <button onClick={handlePlaceOrder}>Place Order</button>
      ) : (
        <button onClick={handlePayment}>Pay Now</button>
      )}
    </>
  );
};