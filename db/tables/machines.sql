CREATE TABLE machines (
    machine_id INT PRIMARY KEY AUTO_INCREMENT,
    machine_name VARCHAR(255)
);

ALTER TABLE machines
ADD COLUMN color_hex varchar(10) default '#FFFFFF' after machine_name;