import React from 'react'
import styles from '../styles/Product.module.css';

const Product = ({ product }) => {
    return (
        <>
            {product && <div className="card" style={{ width: "100%" }}>
                <img src={product.image} className={`${'card-img-top p-2'} ${styles.image}`} alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title">{product.title.slice(0, 20)}</h5>
                    <p className="card-text">{product.description.slice(0, 35)}...</p>
                    <div className='d-flex align-iteems-center justify-content-between'>
                        <b className="card-text">{product.price} $</b>
                        <b className="card-text">{product.rating.rate}</b>
                    </div>
                </div>
            </div >}
        </>
    )
}

export default Product