import React, { useState } from "react";
import { motion } from "framer-motion";

const steps = ["Customer Info", "Payment", "Confirmation"];

const CheckoutModal = ({ isOpen, onClose, onCheckout }) => {
  const [step, setStep] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [gcashPhone, setGcashPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleConfirm = () => {
    onCheckout({
      ...customerInfo,
      paymentMethod,
      gcashPhone: paymentMethod === "gcash" ? gcashPhone : undefined,
      cardNumber: paymentMethod === "card" ? cardNumber : undefined,
      cardExpiry: paymentMethod === "card" ? cardExpiry : undefined,
    });
    onClose();
    setStep(0);
    // Reset fields if you want:
    setCustomerInfo({ name: "", email: "", contact: "", address: "" });
    setPaymentMethod("cod");
    setGcashPhone("");
    setCardNumber("");
    setCardExpiry("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md font-poppins relative
          max-[400px]:max-w-[90vw] max-[400px]:p-4"
      >
        {/* Exit Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute -top-4 right-0 text-gray-700 hover:text-red-500 font-bold text-xl bg-white rounded-full h-10 w-10"
        >
          x
        </button>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-semibold mb-1">
            {steps.map((s, i) => (
              <span
                key={i}
                className={i === step ? "text-green-600" : "text-gray-400"}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="h-2 rounded-full transition-all bg-green-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        {step === 0 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
              <input
                type="text"
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Email Address
              <input
                type="email"
                placeholder="Email Address"
                value={customerInfo.email}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, email: e.target.value })
                }
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Contact Number
              <input
                type="tel"
                placeholder="Contact Number"
                value={customerInfo.contact}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, contact: e.target.value })
                }
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Delivery Address
              <textarea
                placeholder="Delivery Address"
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, address: e.target.value })
                }
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                rows={3}
              />
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Cash on Delivery
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="gcash"
                checked={paymentMethod === "gcash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              GCash
            </label>
            {paymentMethod === "gcash" && (
              <input
                type="tel"
                placeholder="GCash Phone Number"
                value={gcashPhone}
                onChange={(e) => setGcashPhone(e.target.value)}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            )}

            <label className="flex items-center mt-4">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Credit/Debit Card
            </label>
            {paymentMethod === "card" && (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  maxLength={19}
                />
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  maxLength={5}
                />
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-sm">
            <div>
              <strong>Name:</strong> {customerInfo.name}
            </div>
            <div>
              <strong>Email:</strong> {customerInfo.email}
            </div>
            <div>
              <strong>Contact Number:</strong> {customerInfo.contact}
            </div>
            <div>
              <strong>Delivery Address:</strong> {customerInfo.address}
            </div>
            <div>
              <strong>Payment Method:</strong> {paymentMethod.toUpperCase()}
            </div>
            {paymentMethod === "gcash" && (
              <div>
                <strong>GCash Phone Number:</strong> {gcashPhone}
              </div>
            )}
            {paymentMethod === "card" && (
              <>
                <div>
                  <strong>Card Number:</strong> {cardNumber}
                </div>
                <div>
                  <strong>Expiry Date:</strong> {cardExpiry}
                </div>
              </>
            )}
            <p className="text-gray-500 text-xs mt-2">
              Please confirm your order details before proceeding.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-between">
          {step > 0 ? (
            <button type="button"
              onClick={handlePrev}
              className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < steps.length - 1 ? (
            <button type="button"
              onClick={handleNext}
              disabled={
                (step === 0 &&
                  (!customerInfo.name ||
                    !customerInfo.email ||
                    !customerInfo.contact ||
                    !customerInfo.address)) ||
                (step === 1 &&
                  ((paymentMethod === "gcash" && !gcashPhone) ||
                    (paymentMethod === "card" && (!cardNumber || !cardExpiry))))
              }
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button type="button"
              onClick={handleConfirm}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Confirm Order
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
