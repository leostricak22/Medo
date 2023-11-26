DELIMITER //
DROP PROCEDURE IF EXISTS sp_generate_patient_schedule;

CREATE PROCEDURE sp_generate_patient_schedule(p_patient_id int,p_duration int)
BEGIN

select fraction_operations,UNIX_TIMESTAMP(treatment_start),cancer_id into @fraction_operations,@nextAvailableDate,@cancer_id from patient_data where patient_id=p_patient_id;
-- select @fraction_operations;
DROP table IF EXISTS allowed_machines_temp;

create table allowed_machines_temp(
	select machine_id from treatment_machines where treatment_machines.cancer_id=@cancer_id    
);



select machine_id into @machine_id 
from machines allowed_machines_temp order by rand() limit 1;


set @duration=p_duration;

WHILE @fraction_operations > 0 DO
     
     INSERT INTO `medo`.`schedule`
	(
	`schedule_datetime`,
	`patient_id`,
	`machine_id`,
	`duration`,
	`attended`)
	VALUES
	(
	@nextAvailableDate,
	p_patient_id,
	@machine_id,
	@duration,
	false);         
	SET @fraction_operations = @fraction_operations - 1;    
    set @nextAvailableDate=
    UNIX_TIMESTAMP(
    CASE 
    WHEN DAYOFWEEK(FROM_UNIXTIME(@nextAvailableDate)) = 7 THEN DATE_ADD(FROM_UNIXTIME(@nextAvailableDate), INTERVAL 2 DAY) -- If Saturday, add 2 days
    WHEN DAYOFWEEK(FROM_UNIXTIME(@nextAvailableDate)) = 1 THEN DATE_ADD(FROM_UNIXTIME(@nextAvailableDate), INTERVAL 1 DAY) -- If Sunday, add 1 day
    ELSE DATE_ADD(FROM_UNIXTIME(@nextAvailableDate), INTERVAL 1 DAY) -- For other days, add 1 day
    
    -- if next date is already filled schedule them next + the duration of the previous schedule
    
    
  END) ;
        
   -- UNIX_TIMESTAMP(DATE_ADD(FROM_UNIXTIME(@nextAvailableDate), INTERVAL 1 DAY));
     
    
END WHILE;






SELECT LAST_INSERT_ID();

END //

DELIMITER ;