import React, { useEffect, useState, useMemo } from 'react'
import Product from './Product';
import Filters from './Filters';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [productsToShow, setProductsToShow] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');  // Add state for the search term
    const [selectedCategory, setSelectedCategory] = useState('All'); //Add state for category
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 }); // Add state for price
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    // Memoized filtered products
    const productsToShowMemo = useMemo(() => {
        if (loading) {
            return [];
        }

        let filteredProds = [...products];

        if (searchTerm) {
            filteredProds = filteredProds.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'All' && selectedCategory) {
            filteredProds = filteredProds.filter(product => product.category === selectedCategory);
        }

        if (priceRange && priceRange.max !== 0) {
            let min = parseInt(priceRange.min);
            let max = parseInt(priceRange.max);
            if (min <= max) { //Fixed the reversed logic
                filteredProds = filteredProds.filter(product => product.price >= min && product.price <= max);
            }

        }
        if (rating > 0) {
            filteredProds = filteredProds.filter(product => product.rating.rate >= rating);
        }

        return filteredProds;

    }, [products, searchTerm, selectedCategory, priceRange, rating, loading]);  // Add all dependencies

    // Update productsToShow when memoized products change
    useEffect(() => {
        setProductsToShow(productsToShowMemo);
    }, [productsToShowMemo]);

    // Handlers to update state directly
    const handleSearch = (value) => {
        setSearchTerm(value);
    }

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    }

    const handlePriceFilter = (price) => {
        setPriceRange(price);
    }

    const handleRatingFilter = (rate) => {
        setRating(rate);
    }


    return (
        <>
            <div className='container-fluid p-5'>
                {loading && <h5 className='text-center'>Loading...</h5>}
                <div className='row'>
                    <div className='col-2'>
                        <Filters categories={products.map(product => product.category)}
                            onSearch={handleSearch} onCategoryFilter={handleCategoryFilter} onPriceFilter={handlePriceFilter}
                            onRatingFilter={handleRatingFilter} />
                    </div>
                    <div className='col-10'>
                        <div className='row'>
                            {productsToShow && productsToShow.length > 0 && productsToShow.map(product => {
                                return (
                                    <div className='col-3 mb-2' key={product.id}>
                                        <Product product={product} />
                                    </div>
                                )
                            })}
                        </div>
                        {!loading && productsToShow.length === 0 && <h5 className='text-center'>No products found!</h5>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsList