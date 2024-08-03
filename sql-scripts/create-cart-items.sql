CREATE TABLE cart_items (
    cart_id UUID REFERENCES carts(id),
    product_id UUID,
    count INTEGER,
    PRIMARY KEY (cart_id, product_id)
);
