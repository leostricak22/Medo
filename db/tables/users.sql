CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(50),
    user_fname VARCHAR(50),
    user_email VARCHAR(50),
    password VARCHAR(50),
    user_type INT,
    FOREIGN KEY (user_type) REFERENCES user_types(type_id)
);