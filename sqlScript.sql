-- Create the carts table
CREATE TABLE carts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('OPEN', 'ORDERED'))
);

-- Create the cart_items table
CREATE TABLE cart_items (
  cart_id UUID REFERENCES carts(id),
  product_id UUID DEFAULT uuid_generate_v4(),
  count INTEGER,
  PRIMARY KEY (cart_id, product_id)
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert sample data into the carts table
INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '2023-07-05', '2023-07-05', 'OPEN'),
  ('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '2023-07-06', '2023-07-06', 'ORDERED');

-- Insert sample data into the cart_items table
INSERT INTO cart_items (cart_id, product_id, count)
VALUES
  ('11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 3),
  ('11111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666666', 2),
  ('33333333-3333-3333-3333-333333333333', '77777777-7777-7777-7777-777777777777', 1);

-- Create the orders table
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  cart_id UUID REFERENCES carts(id),
  payment JSON,
  delivery JSON,
  comments TEXT,
  status VARCHAR(20) CHECK (status IN ('OPEN', 'ORDERED')),
  total NUMERIC(10, 2)
);

-- Add an index on the cart_id column for faster lookup
CREATE INDEX ON orders (cart_id);
