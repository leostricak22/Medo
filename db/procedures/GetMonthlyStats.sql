DELIMITER //

DROP PROCEDURE IF EXISTS GetMonthlyStats;


CREATE PROCEDURE GetMonthlyStats()
BEGIN
    SELECT 
        machine_id,
        DATE_FORMAT(FROM_UNIXTIME(schedule_datetime), '%Y-%m') AS month,
        COUNT(*) AS total_appointments,
        SUM(duration) AS total_duration,
        SUM(attended) AS total_attended
    FROM schedule
    GROUP BY machine_id, month;
END //

DELIMITER ;