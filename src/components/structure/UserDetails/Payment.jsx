import React, { useState, useEffect } from "react";
import Tooltip from "../../common/tooltip";

const PaymentSection = ({ isEditing, toggleEdit, userId }) => {
  const API_BASE_URL = 'http://localhost/MMSU/mmsu-backend/profile/payments.php';
  
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
  const [errors, setErrors] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: "0", right: "0" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchPaymentMethods();
    }
  }, [userId]);

  const fetchPaymentMethods = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}?user_id=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch payment methods");
      const data = await response.json();
      setPaymentMethods(data);
    } catch (error) {
      showErrorTooltip(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const showErrorTooltip = (message, element) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      setTooltipPosition({
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
      });
    }
    setTooltipMessage(message);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  const validateInputs = () => {
    const newErrors = {};

    if (paymentType === "card") {
      if (!newPayment.cardNumber) {
        newErrors.cardNumber = "Card number is required";
      } else {
        const cleanCardNumber = newPayment.cardNumber.replace(/\s/g, "");
        if (cleanCardNumber.length !== 16 || !/^\d+$/.test(cleanCardNumber)) {
          newErrors.cardNumber = "Please enter a valid 16-digit card number";
        }
      }

      if (!newPayment.expiry) {
        newErrors.expiry = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(newPayment.expiry)) {
        newErrors.expiry = "Please enter expiry date in MM/YY format";
      }

      if (!newPayment.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(newPayment.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits";
      }
    } else if (!newPayment.gcashPhone) {
      newErrors.gcashPhone = "GCash phone number is required";
    } else if (!/^09\d{9}$/.test(newPayment.gcashPhone)) {
      newErrors.gcashPhone = "Please enter a valid Philippine mobile number (09XXXXXXXXX)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPayment = async () => {
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      const paymentMethod = {
        user_id: userId,
        type: paymentType,
        is_default: newPayment.is_default,
        ...(paymentType === "card"
          ? {
              card_number: newPayment.cardNumber.replace(/\s/g, ""),
              card_expiry: newPayment.expiry,
            }
          : {
              gcash_phone: newPayment.gcashPhone,
            }),
      };

      let url = API_BASE_URL;
      let method = 'POST';
      
      if (editingPayment) {
        paymentMethod.payment_id = editingPayment.payment_id;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentMethod),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save payment method");
      }

      const savedPayment = await response.json();
      
      if (editingPayment) {
        setPaymentMethods(
          paymentMethods.map((method) =>
            method.payment_id === editingPayment.payment_id ? savedPayment : method
          )
        );
      } else {
        setPaymentMethods([...paymentMethods, savedPayment]);
      }

      setShowModal(false);
      resetForm();
    } catch (error) {
      showErrorTooltip(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePayment = async (id) => {
    if (!window.confirm("Are you sure you want to remove this payment method?")) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete payment method");
      }

      setPaymentMethods(paymentMethods.filter((method) => method.payment_id !== id));
    } catch (error) {
      showErrorTooltip(error.message);
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
    setErrors({});
  };

  const formatCardNumber = (number) => {
    return number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .substr(0, 19);
  };

  const formatExpiry = (value) => {
    if (value.length === 2 && !value.includes("/")) {
      return `${value}/`;
    }
    return value;
  };

  const setAsDefault = async (paymentId) => {
    try {
      setIsLoading(true);
      const response = await fetch(API_BASE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          payment_id: paymentId,
          is_default: true 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to set default payment");
      }

      const updatedPayment = await response.json();
      
      setPaymentMethods(
        paymentMethods.map((method) => ({
          ...method,
          is_default: method.payment_id === paymentId,
        }))
      );
    } catch (error) {
      showErrorTooltip(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl relative">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-base sm:text-xl font-bold">Payment Methods</h2>
        </div>

        {isLoading && paymentMethods.length === 0 ? (
          <p className="text-xs sm:text-sm text-gray-600">Loading payment methods...</p>
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
                    >
                      Set as default
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditPayment(method)}
                    className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                    <button
                      onClick={() => handleRemovePayment(method.payment_id)}
                      className="text-red-500 hover:text-red-700 text-xs sm:text-sm"
                    >
                      Remove
                    </button>

                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm mt-2 sm:mt-3 font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Add Payment Method"}
        </button>

        {showTooltip && (
          <Tooltip
            message={tooltipMessage}
            onClose={() => setShowTooltip(false)}
            position={tooltipPosition}
          />
        )}
      </section>

      {/* Add/Edit Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              {editingPayment ? "Edit Payment Method" : "Add Payment Method"}
            </h3>

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
                    setNewPayment((prev) => ({ ...prev, type: "card" }));
                    setErrors({});
                  }}
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
                    setNewPayment((prev) => ({ ...prev, type: "gcash" }));
                    setErrors({});
                  }}
                >
                  GCash
                </button>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {paymentType === "card" ? (
                <>
                  <div className="relative">
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-3 py-2 border rounded text-xs sm:text-sm ${
                        errors.cardNumber ? "border-red-500" : ""
                      }`}
                      value={formatCardNumber(newPayment.cardNumber)}
                      onChange={(e) => {
                        setNewPayment({
                          ...newPayment,
                          cardNumber: e.target.value.replace(/\s/g, ""),
                        });
                        if (errors.cardNumber) setErrors({ ...errors, cardNumber: null });
                      }}
                      maxLength={19}
                    />
                    {errors.cardNumber && (
                      <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
                        {errors.cardNumber}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className={`w-full px-3 py-2 border rounded text-xs sm:text-sm ${
                          errors.expiry ? "border-red-500" : ""
                        }`}
                        value={newPayment.expiry}
                        onChange={(e) => {
                          setNewPayment({
                            ...newPayment,
                            expiry: formatExpiry(e.target.value),
                          });
                          if (errors.expiry) setErrors({ ...errors, expiry: null });
                        }}
                        maxLength={5}
                      />
                      {errors.expiry && (
                        <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
                          {errors.expiry}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="123"
                        className={`w-full px-3 py-2 border rounded text-xs sm:text-sm ${
                          errors.cvv ? "border-red-500" : ""
                        }`}
                        value={newPayment.cvv}
                        onChange={(e) => {
                          setNewPayment({ ...newPayment, cvv: e.target.value });
                          if (errors.cvv) setErrors({ ...errors, cvv: null });
                        }}
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
                          {errors.cvv}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative">
                  <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                    GCash Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="0912 345 6789"
                    className={`w-full px-3 py-2 border rounded text-xs sm:text-sm ${
                      errors.gcashPhone ? "border-red-500" : ""
                    }`}
                    value={newPayment.gcashPhone}
                    onChange={(e) => {
                      setNewPayment({
                        ...newPayment,
                        gcashPhone: e.target.value,
                      });
                      if (errors.gcashPhone) setErrors({ ...errors, gcashPhone: null });
                    }}
                  />
                  {errors.gcashPhone && (
                    <span className="absolute -bottom-5 left-0 text-red-500 text-xs">
                      {errors.gcashPhone}
                    </span>
                  )}
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
                className="px-3 py-1.5 text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : editingPayment ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentSection;