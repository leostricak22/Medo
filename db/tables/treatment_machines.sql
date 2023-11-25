CREATE TABLE treatment_machines (
    treatment_id INT AUTO_INCREMENT,
    machine_id INT,
    cancer_id INT,
    PRIMARY KEY (treatment_id, machine_id, cancer_id),
    FOREIGN KEY (machine_id) REFERENCES machines(machine_id),
    FOREIGN KEY (cancer_id) REFERENCES cancer(cancer_id)
);