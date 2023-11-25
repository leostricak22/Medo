select * from users;
select * from machines;
select * from schedule;
select * from patient_data;
select * from treatment_machines;
select * from user_types;
select * from cancer;

drop table cancer;

INSERT INTO `medo`.`cancer`(`cancer_id`,`cancer_name`,`probability`,`fraction_number_options`) VALUES(<{cancer_id: }>,<{cancer_name: }>,<{probability: }>,<{fraction_number_options: }>);
