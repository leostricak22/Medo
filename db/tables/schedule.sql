CREATE TABLE schedule (
    schedule_id INT PRIMARY KEY,
    schedule_datetime int,
    patient_id INT,
    machine_id INT,
    duration INT,
    attended BOOLEAN default false,
    FOREIGN KEY (patient_id) REFERENCES patient_data(patient_id),
    FOREIGN KEY (machine_id) REFERENCES machines(machine_id)
);