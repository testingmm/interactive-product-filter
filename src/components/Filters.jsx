import React, { useState } from 'react'
import styles from '../styles/Product.module.css';

const Filters = ({ categories, onSearch, onCategoryFilter, onPriceFilter, onRatingFilter }) => {
    let filteredCategories = [...new Set(categories)];
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const [rating, setRating] = useState(0);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        onCategoryFilter(category);
    }

    const handlePriceRange = (e) => {
        setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
        onPriceFilter(priceRange);
    }

    const handleRating = (e) => {
        setRating(e.target.value);
        onRatingFilter(rating);
    }

    return (
        <>
            <h5>Filters</h5>
            <div className='row'>
                <div className='col'>
                    <input type='search' className='form-control' placeholder='Search' onChange={(e) => onSearch(e.target.value)} />
                </div>
                <div className='col-12 mt-3'>
                    <label className='text-muted'>Categories</label>
                    <ul className='list-group'>
                        <li className={`${'list-group-item'} ${styles.cursorPointer} ${selectedCategory === 'All' && 'active'}`} onClick={() => handleCategoryFilter('All')}>All</li>
                        {filteredCategories && filteredCategories.length > 0 && filteredCategories.map(category => {
                            return (
                                <li className={`${'list-group-item'} ${styles.cursorPointer} ${selectedCategory === category && 'active'}`} key={category} onClick={() => handleCategoryFilter(category)}>{category}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className='col-12 mt-3'>
                    <label className='text-muted'>Price Range: {priceRange.min} - {priceRange.max}</label>
                    <div className='row mt-1'>
                        <div className='col'>
                            <input type='range' className={`${'form-range'} ${styles.cursorPointer}`} name='min' step={10} placeholder='Min' min={0} max={1000} value={priceRange.min} onChange={(e) => handlePriceRange(e)} />
                        </div>
                        <div className='col'>
                            <input type='range' className={`${'form-range'} ${styles.cursorPointer}`} name='max' step={10} placeholder='Max' min={0} max={1000} value={priceRange.max} onChange={(e) => handlePriceRange(e)} />
                        </div>
                    </div>
                </div>
                <div className='col-12 mt-3'>
                    <label className='text-muted'>Rating: {rating}</label>
                    <input type='range' className={`${'form-range'} ${styles.cursorPointer}`} name='min' step={0.1} placeholder='Min' min={0} max={5} value={rating} onChange={(e) => handleRating(e)} />
                </div>
            </div>
        </>
    )
}

export default Filters