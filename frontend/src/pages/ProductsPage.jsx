import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/productApi';
import './ProductsPage.css';

// Fallback demo products when backend is not available
const demoProducts = [
    { id: 1, name: 'Rose Glow Face Serum', description: 'Hydrating serum with rosehip oil for radiant, glowing skin.', price: 899, stock: 25, imageUrl: 'https://placehold.co/300x300/fce4ec/b8860b?text=Face+Serum' },
    { id: 2, name: 'Keratin Hair Mask', description: 'Deep conditioning mask for smooth, silky, and frizz-free hair.', price: 1299, stock: 15, imageUrl: 'https://placehold.co/300x300/fff3e0/b8860b?text=Hair+Mask' },
    { id: 3, name: 'Vitamin C Brightening Cream', description: 'Brightening moisturizer with Vitamin C to reduce dark spots.', price: 749, stock: 30, imageUrl: 'https://placehold.co/300x300/f3e5f5/b8860b?text=Brightening+Cream' },
    { id: 4, name: 'Charcoal Face Wash', description: 'Deep cleansing activated charcoal face wash for clear skin.', price: 399, stock: 50, imageUrl: 'https://placehold.co/300x300/e8eaf6/b8860b?text=Face+Wash' },
    { id: 5, name: 'Argan Oil Hair Serum', description: 'Premium argan oil serum for shiny, nourished, and healthy hair.', price: 599, stock: 20, imageUrl: 'https://placehold.co/300x300/e0f2f1/b8860b?text=Hair+Serum' },
    { id: 6, name: 'Luxury Nail Polish Set', description: 'Set of 6 premium nail polishes in trending colors.', price: 649, stock: 0, imageUrl: 'https://placehold.co/300x300/fce4ec/b8860b?text=Nail+Polish' },
    { id: 7, name: 'Aloe Vera Gel', description: 'Pure aloe vera gel for skin hydration and cooling relief.', price: 249, stock: 40, imageUrl: 'https://placehold.co/300x300/e8f5e9/b8860b?text=Aloe+Gel' },
    { id: 8, name: 'Sunscreen SPF 50+', description: 'Broad-spectrum sunscreen for daily UV protection.', price: 549, stock: 35, imageUrl: 'https://placehold.co/300x300/fffde7/b8860b?text=Sunscreen' },
];

/**
 * ProductsPage — displays product grid fetched from API, with fallback to demo data.
 */
export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        'All', 'Hair', 'Skincare', 'Hair Care', 'Makeup', 'Nail Care', 'Body Care', 'Salon Professional', 'Herbal Products'
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products:', err);
            // Default to empty list if API fails
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="products-page">
            <div className="page-header">
                <h1>The Botanical Collection</h1>
                <p>Sophisticated beauty essentials curated for your daily self-care ritual.</p>
            </div>

            <section className="section">
                <div className="container">
                    {/* Search */}
                    <div className="products-toolbar">
                        <div className="products-search-wrapper">
                            <input
                                className="form-input products-search"
                                type="text"
                                placeholder="🔍 Search products..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="products-filters">
                            <select
                                className="form-input category-select"
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <span className="products-count">{filteredProducts.length} products</span>
                    </div>

                    {loading ? (
                        <div className="spinner"></div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="empty-state">
                            <div className="icon">🔍</div>
                            <h3>No products found</h3>
                            <p>Try adjusting your search term.</p>
                        </div>
                    ) : (
                        <div className="grid grid-4">
                            {filteredProducts.map((product, idx) => (
                                <ProductCard key={product.id} product={product} index={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
