CREATE TABLE patient_data (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(255),
    cancer_id INT,
    dob DATE,
    height decimal(19,2),
    weight decimal(19,2),    
    gender VARCHAR(10),
    treatment_start DATETIME DEFAULT NULL ,
    treatment_done BOOLEAN default false ,
    cancer_severity INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (cancer_id) REFERENCES cancer(cancer_id)
);