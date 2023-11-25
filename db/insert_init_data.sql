-- user types
INSERT INTO `medo`.`user_types`
(`type_id`,
`type_name`,
`type_description`)
VALUES
(1,
'doctor',
'Doctor user');

INSERT INTO `medo`.`user_types`
(`type_id`,
`type_name`,
`type_description`)
VALUES
(2,
'patient',
'Patient');
-- cancer
INSERT INTO `medo`.`cancer`(`cancer_name`,`probability`,`fraction_number_options`) VALUES('Craniospinal',0.01,'[13,17,20,30]');
INSERT INTO `medo`.`cancer`(`cancer_name`,`probability`,`fraction_number_options`) VALUES('Breast',0.25,'[15,19,25,30]');
INSERT INTO `medo`.`cancer`(`cancer_name`,`probability`,`fraction_number_options`) VALUES('Breast special',0.05,'[15,19,25,30]');
INSERT INTO `medo`.`cancer`(`cancer_name`,`probability`,`fraction_number_options`) VALUES('Head & neck',0.1,'[5,10,15,25,30,33,35]');
INSERT INTO `medo`.`cancer`(`cancer_name`,`probability`,`fraction_number_options`) VALUES('Abdomen',0.1,'[1,3,5,8,10,12,15,18,20,30]');
INSERT INTO `medo`.`cancer`(`cancer_name`,`probability`,`fraction_number_options`) VALUES('Pelvis',0.18,'[1,3,5,10,15,22,23,25,28,35]');
INSERT INTO `medo`.`cancer`(`cancer_name`,`probability`,`fraction_number_options`) VALUES('Crane',0.04,'[1,5,10,13,25,30]');
INSERT INTO `medo`.`cancer`(`cancer_name`,`probability`,`fraction_number_options`) VALUES('Lung',0.12,'[1,5,10,15,20,25,30,33]');
INSERT INTO `medo`.`cancer`(`cancer_name`,`probability`,`fraction_number_options`) VALUES('Lung special',0.05,'[3,5,8]');
INSERT INTO `medo`.`cancer`(`cancer_name`,`probability`,`fraction_number_options`) VALUES('Whole Brain',0.1,'[5,10,12]');

-- machines
INSERT INTO `medo`.`machines`(`machine_name`)VALUES('TB1');
INSERT INTO `medo`.`machines`(`machine_name`)VALUES('TB2');
INSERT INTO `medo`.`machines`(`machine_name`)VALUES('VB1');
INSERT INTO `medo`.`machines`(`machine_name`)VALUES('VB2');
INSERT INTO `medo`.`machines`(`machine_name`)VALUES('U');


-- treatment_machines
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(1,1);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(1,2);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(1,3);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(1,4);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(1,5);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(1,6);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(1,7);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(1,8);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(1,9);

INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(2,1);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(2,2);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(2,3);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(2,4);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(2,5);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(2,6);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(2,7);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(2,8);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(2,9);

INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(3,2);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(3,4);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(3,5);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(3,6);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(3,7);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(3,8);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(3,9);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(3,10);


INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(4,1);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(4,2);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(4,3);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(4,4);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(4,5);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(4,6);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(4,7);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(4,8);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(4,9);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(4,10);

INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(5,1);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(5,2);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(5,3);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(5,4);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(5,5);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(5,6);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(5,7);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(5,8);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(5,9);
INSERT INTO `medo`.`treatment_machines`(`machine_id`,`cancer_id`)VALUES(5,10);
