import React, { useState } from "react";

const PaymentSection = ({ isEditing, toggleEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  const handleAddPayment = () => {
    if (newPayment.cardNumber && newPayment.expiry && newPayment.cvv && newPayment.name) {
      setPaymentMethods([...paymentMethods, { ...newPayment, id: Date.now() }]);
      setNewPayment({ cardNumber: "", expiry: "", cvv: "", name: "" });
      setShowModal(false);
    }
  };

  const handleRemovePayment = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  return (
    <>
      <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-base sm:text-xl font-bold">Payment Methods</h2>
          <button 
            onClick={toggleEdit} 
            className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {paymentMethods.length === 0 ? (
          <p className="text-xs sm:text-sm text-gray-600">No saved payment methods.</p>
        ) : (
          <ul className="space-y-2">
            {paymentMethods.map((method) => (
              <li key={method.id} className="flex justify-between items-center p-2 sm:p-3 border rounded">
                <div>
                  <p className="text-xs sm:text-sm font-medium">•••• •••• •••• {method.cardNumber.slice(-4)}</p>
                  <p className="text-xs text-gray-500">{method.name}</p>
                </div>
                {isEditing && (
                  <button 
                    onClick={() => handleRemovePayment(method.id)}
                    className="text-red-500 hover:text-red-700 text-xs sm:text-sm"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        <button 
          onClick={() => setShowModal(true)}
          className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm mt-2 sm:mt-3 font-medium"
        >
          Add Payment Method
        </button>
      </section>

      {/* Add Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Add Payment Method</h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border rounded text-xs sm:text-sm"
                  value={newPayment.cardNumber}
                  onChange={(e) => setNewPayment({...newPayment, cardNumber: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border rounded text-xs sm:text-sm"
                    value={newPayment.expiry}
                    onChange={(e) => setNewPayment({...newPayment, expiry: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-600 mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border rounded text-xs sm:text-sm"
                    value={newPayment.cvv}
                    onChange={(e) => setNewPayment({...newPayment, cvv: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">Name on Card</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border rounded text-xs sm:text-sm"
                  value={newPayment.name}
                  onChange={(e) => setNewPayment({...newPayment, name: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 sm:mt-6">
              <button 
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddPayment}
                className="px-3 py-1.5 text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentSection;