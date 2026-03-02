package com.darshu.salon.service;

import com.darshu.salon.entity.Product;
import com.darshu.salon.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * ProductService — business logic for product CRUD and stock management.
 */
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /** Get all products */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /** Get a product by ID */
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    /** Create a new product */
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    /** Update an existing product */
    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setPrice(updatedProduct.getPrice());
            product.setStock(updatedProduct.getStock());
            product.setImageUrl(updatedProduct.getImageUrl());
            product.setCategory(updatedProduct.getCategory());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    /** Delete a product by ID */
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    /** Reduce stock after purchase */
    public void reduceStock(Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }

        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
    }
}
