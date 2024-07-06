import React, { useState } from 'react';
import './CartComponents.scss';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrderProduct } from '../../redux/counter/orderSlice';
import { addFavoriteProduct } from '../../redux/counter/favoriteSlice'; // Import addFavoriteProduct
import { toast } from 'react-toastify';
import QuickViewComponent from '../QuickViewComponent/QuickViewComponent';

const CartComponents = (props) => {
  const [isQuickViewVisible, setQuickViewVisible] = useState(false);
  const { id, countInStock, descriptions, image, name, price, rating, type, original_price } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  const isValidObjectId = (id) => {
    return /^[a-fA-F0-9]{24}$/.test(id);
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    return stars;
  };

  const isProductsPage = location.pathname === '/products';

  const handleAddCart = () => {
    dispatch(addOrderProduct({
      orderItem: {
        name,
        amount: 1,
        image: image,
        price,
        product: id,
        original_price,
      }
    }));
    toast.success('Sản phẩm đã được thêm vào giỏ hàng');
  };

  const handleAddFavorite = () => {
    dispatch(addFavoriteProduct({
      id,
      name,
      image,
      price,
      original_price,
      rating,
      descriptions,
      countInStock,
      type,
    }));
    toast.success('Sản phẩm đã được thêm vào danh sách yêu thích');
  };

  if (!isValidObjectId(id)) {
    console.error('Invalid product ID:', id);
    return null;
  }
  const handleQuickView = () => {
    setQuickViewVisible(true);
  };

  const closeQuickView = () => {
    setQuickViewVisible(false);
  };

  return (
    <div className={`col-lg-${isProductsPage ? '4' : '3'} col-md-6`}>
      <div className="single-product">
        <div>
          <div className="product-img">
            {Array.isArray(image) ? (
              <Link to={`/product-detail/${id}`}>
               <div className='aaaa'> <img style={{ width: '80%' }} className="img-fluid" src={image[0]} alt={name} /></div>
              </Link>
            ) : (
              <img style={{ width: '90%' }} className="img-fluid" src={image} alt={name} />
            )}
            <div className="p_icon quickview">
              <Link onClick={handleQuickView}>
                <i className="fa-regular fa-eye"></i>
              </Link>
              <a onClick={handleAddFavorite}>
                <i className="fa-regular fa-heart"></i>
              </a>
              <a onClick={handleAddCart}>
                <i className="fa-solid fa-cart-plus"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="product-btm">
          <Link to={`/product-detail/${id}`} className="d-block">
            <p className="name_product">{name}</p>
          </Link>
          <div className="mt-4 cart-title">
            <span style={{ color: 'var(--text-color)' }}>{price} đ</span>
            <span>{original_price} đ</span>
          </div>
          <div className="promotion">
            <p style={{ textTransform: 'none' }} className="coupon-price">
              Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...
            </p>
          </div>
          <div className="cart-footer">
            <div className="cart-footer-start">{renderRatingStars()}</div>
            <div className="cart-footer-favourite">
              <p style={{ textTransform: 'none' }}>
                Yêu thích <i className="fa-regular fa-heart"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isQuickViewVisible && (
        <QuickViewComponent
          product={{ id, countInStock, descriptions, image, name, price, rating, type, original_price }}
          onClose={closeQuickView}
        />
      )}
    </div>
  );
};

export default CartComponents;
