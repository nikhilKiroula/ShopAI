import { useEffect, useState } from "react";
import api from "@/services/api.service";

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get("/addresses");

        console.log("Address Object:", response.data.data[0]);
        setAddresses(response.data.data);
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };

    fetchAddresses();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
        alert("Please select a delivery address");
        return;
    }

    try {
        const response = await api.post("/orders", {
            addressId: selectedAddressId,
        });

        console.log("Order created:", response.data);

        setOrder(response.data.data);
    } catch (error) {
        console.log(
            error.response?.data || error
        );
    }
};

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Delivery Address</h2>

        <div className="mt-4 space-y-4">
          {addresses.map((address) => (
            <div key={address._id} className="rounded-lg border p-5">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="address"
                  value={address._id}
                  checked={selectedAddressId === address._id}
                  onChange={() => setSelectedAddressId(address._id)}
                />

                <div>
                  <h3 className="font-semibold">{address.label}</h3>

                  <p className="mt-1">{address.fullName}</p>

                  <p className="text-gray-600">{address.addressLine}</p>

                  <p className="text-gray-600">
                    {address.city}, {address.state} - {address.postalCode}
                  </p>

                  <p className="text-gray-600">{address.country}</p>

                  <p className="mt-1">Phone: {address.phone}</p>

                  {address.isDefault && (
                    <span className="mt-2 inline-block text-sm font-medium">
                      Default Address
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePlaceOrder}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white cursor-pointer"
      >
        Place Order
      </button>
    </section>
  );
};

export default Checkout;
