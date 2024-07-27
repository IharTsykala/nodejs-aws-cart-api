CREATE TABLE carts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status VARCHAR(10) CHECK (status IN ('OPEN', 'ORDERED'))
);
