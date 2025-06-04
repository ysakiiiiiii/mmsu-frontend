import React, { useState, useEffect } from "react";

const PaymentSection = ({ isEditing, toggleEdit, userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentType, setPaymentType] = useState("card");
  const [editingPayment, setEditingPayment] = useState(null);
  const [newPayment, setNewPayment] = useState({
    type: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    gcashPhone: "",
    is_default: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost/MMSU/mmsu-backend/profile/payments.php?user_id=${userId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPaymentMethods(data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        setError("Failed to load payment methods. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [userId]);

  const handleAddPayment = async () => {
    // Validate fields based on payment type
    if (paymentType === "card") {
      if (!newPayment.cardNumber || !newPayment.expiry) {
        alert("Please fill all card details");
        return;
      }
      
      const cleanCardNumber = newPayment.cardNumber.replace(/\s/g, "");
      if (cleanCardNumber.length !== 16 || !/^\d+$/.test(cleanCardNumber)) {
        alert("Please enter a valid 16-digit card number");
        return;
      }
      
      if (!/^\d{2}\/\d{2}$/.test(newPayment.expiry)) {
        alert("Please enter expiry date in MM/YY format");
        return;
      }
    } else if (!newPayment.gcashPhone) {
      alert("Please enter GCash phone number");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const payload = {
        user_id: userId,
        type: paymentType,
        is_default: newPayment.is_default,
      };

      if (paymentType === "card") {
        payload.card_number = newPayment.cardNumber.replace(/\s/g, "");
        payload.card_expiry = newPayment.expiry;
      } else {
        payload.gcash_phone = newPayment.gcashPhone;
      }

      let endpoint = 'http://localhost/MMSU/mmsu-backend/profile/payments.php';
      let method = 'POST';
      
      if (editingPayment) {
        endpoint += `?id=${editingPayment.payment_id}`;
        method = 'PUT';
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save payment method");
      }

      const result = await response.json();
      
      if (editingPayment) {
        setPaymentMethods(paymentMethods.map(method => 
          method.payment_id === editingPayment.payment_id ? result : method
        ));
      } else {
        setPaymentMethods([...paymentMethods, result]);
      }
      
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Payment save error:", error);
      setError(error.message || "Failed to save payment method");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePayment = async (id) => {
    if (!window.confirm("Are you sure you want to remove this payment method?")) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `http://localhost/MMSU/mmsu-backend/profile/payments.php?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove payment method");
      }

      setPaymentMethods(
        paymentMethods.filter((method) => method.payment_id !== id)
      );
    } catch (error) {
      console.error("Error removing payment method:", error);
      setError("Failed to remove payment method");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setPaymentType(payment.type);
    setNewPayment({
      type: payment.type,
      cardNumber: payment.card_number || "",
      expiry: payment.card_expiry || "",
      cvv: "",
      gcashPhone: payment.gcash_phone || "",
      is_default: payment.is_default,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setNewPayment({
      type: "card",
      cardNumber: "",
      expiry: "",
      cvv: "",
      gcashPhone: "",
      is_default: false,
    });
    setPaymentType("card");
    setEditingPayment(null);
    setError(null);
  };

  const formatCardNumber = (number) => {
    return number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .substr(0, 19);
  };

  const formatExpiry = (value) => {
    if (value.length === 2 && !value.includes('/')) {
      return `${value}/`;
    }
    return value;
  };

  const setAsDefault = async (paymentId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `http://localhost/MMSU/mmsu-backend/profile/payments.php?id=${paymentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_default: true,
            user_id: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set as default");
      }

      setPaymentMethods(
        paymentMethods.map((method) => ({
          ...method,
          is_default: method.payment_id === paymentId,
        }))
      );
    } catch (error) {
      console.error("Error setting default payment:", error);
      setError("Failed to set as default payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-base sm:text-xl font-bold">Payment Methods</h2>
          <button
            onClick={toggleEdit}
            className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors"
            disabled={isLoading}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        {isLoading && paymentMethods.length === 0 ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : paymentMethods.length === 0 ? (
          <p className="text-xs sm:text-sm text-gray-600">
            No saved payment methods.
          </p>
        ) : (
          <ul className="space-y-2">
            {paymentMethods.map((method) => (
              <li
                key={method.payment_id}
                className="flex justify-between items-center p-2 sm:p-3 border rounded"
              >
                <div>
                  {method.type === "card" ? (
                    <>
                      <p className="text-xs sm:text-sm font-medium">
                        •••• •••• •••• {method.card_number?.slice(-4)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Expires {method.card_expiry}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs sm:text-sm font-medium">GCash</p>
                      <p className="text-xs text-gray-500">
                        {method.gcash_phone}
                      </p>
                    </>
                  )}
                  {method.is_default ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => setAsDefault(method.payment_id)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                      disabled={isLoading}
                    >
                      Set as default
                    </button>
                  )}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPayment(method)}
                      className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm"
                      disabled={isLoading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemovePayment(method.payment_id)}
                      className="text-red-500 hover:text-red-700 text-xs sm:text-sm"
                      disabled={isLoading}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => setShowModal(true)}
          className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm mt-2 sm:mt-3 font-medium"
          disabled={isLoading}
        >
          Add Payment Method
        </button>
      </section>

      {/* Add/Edit Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              {editingPayment ? "Edit Payment Method" : "Add Payment Method"}
            </h3>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                Payment Type
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-xs sm:text-sm ${
                    paymentType === "card"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    setPaymentType("card");
                    setNewPayment(prev => ({ ...prev, type: "card" }));
                  }}
                  disabled={isLoading}
                >
                  Credit/Debit Card
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-xs sm:text-sm ${
                    paymentType === "gcash"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    setPaymentType("gcash");
                    setNewPayment(prev => ({ ...prev, type: "gcash" }));
                  }}
                  disabled={isLoading}
                >
                  GCash
                </button>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {paymentType === "card" ? (
                <>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border rounded text-xs sm:text-sm"
                      value={formatCardNumber(newPayment.cardNumber)}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          cardNumber: e.target.value.replace(/\s/g, ""),
                        })
                      }
                      maxLength={19}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border rounded text-xs sm:text-sm"
                        value={newPayment.expiry}
                        onChange={(e) =>
                          setNewPayment({
                            ...newPayment,
                            expiry: formatExpiry(e.target.value),
                          })
                        }
                        maxLength={5}
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="123"
                        className="w-full px-3 py-2 border rounded text-xs sm:text-sm"
                        value={newPayment.cvv}
                        onChange={(e) =>
                          setNewPayment({ ...newPayment, cvv: e.target.value })
                        }
                        maxLength={4}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                    GCash Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="0912 345 6789"
                    className="w-full px-3 py-2 border rounded text-xs sm:text-sm"
                    value={newPayment.gcashPhone}
                    onChange={(e) =>
                      setNewPayment({
                        ...newPayment,
                        gcashPhone: e.target.value,
                      })
                    }
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="defaultPayment"
                  checked={newPayment.is_default}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      is_default: e.target.checked,
                    })
                  }
                  className="mr-2"
                  disabled={isLoading}
                />
                <label
                  htmlFor="defaultPayment"
                  className="text-xs sm:text-sm text-gray-600"
                >
                  Set as default payment method
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 sm:mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-3 py-1.5 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 rounded"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddPayment}
                className="px-3 py-1.5 text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  editingPayment ? "Update" : "Add"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentSection;