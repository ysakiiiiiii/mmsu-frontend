import React, { useState, useContext, useEffect } from 'react';
import { FiHeart, FiShoppingCart, FiChevronLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from "../../../context/StoreContext";
import { AuthContext } from '../../../auth/AuthWrapper';
import { fetchProductById } from '../../data/fetchProductById';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favorites, addToCart, toggleFavorite } = useStore();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProductById(id)
      .then((data) => {
        if (!data) {
          setError('Product not found');
          setProduct(null);
        } else {
          setProduct(data);
        }
      })
      .catch(() => {
        setError('Failed to fetch product');
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return null;

  const isFavorite = favorites.some(item => item.id === product.id);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const requireAuth = (action) => {
    if (!user.isAuthenticated) {
      navigate('/login', { state: { from: `/store/product/${id}` } });
      return false;
    }
    return true;
  };

  const handleAddToCartClick = () => {
    if (!requireAuth('add to cart')) return;
    addToCart(product, quantity);
  };

  const handleToggleFavorite = () => {
    if (!requireAuth('save favorites')) return;
    toggleFavorite(product);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        type="button" 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 mb-6 hover:text-blue-500 transition-colors"
      >
        <FiChevronLeft className="mr-1" /> Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left panel - Image */}
        <div className="w-full md:w-1/2 bg-gray-50 rounded-lg p-4 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-96 object-contain"
          />
        </div>

        {/* Right panel - Details */}
        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-start mb-4">
            <div>
              {product.tag === 'PREORDER' && (
                <span className="inline-block bg-green-600 text-white text-xs font-Poppins px-3 py-1 rounded mb-2">
                  PREORDER
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-Poppins font-medium">{product.name}</h1>
              <p className="text-xl text-gray-700 font-Montserrat-Light mt-2">{product.price}</p>
            </div>
            <button 
              type="button"
              className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
              onClick={handleToggleFavorite}
            >
              <FiHeart className="w-5 h-5" />
            </button>
          </div>

          <div className="my-6">
            <h2 className="text-lg font-Poppins mb-2">Description</h2>
            <p className="text-gray-600">
              {product.description || "No description available for this product."}
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-center mb-6">
              <span className="mr-4 font-Poppins">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  type="button"
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center border-x py-1 outline-none"
                />
                <button
                  type="button"
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button" 
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
              onClick={handleAddToCartClick}
            >
              <FiShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
