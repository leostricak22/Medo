DELIMITER //

DROP PROCEDURE IF EXISTS GetDailyStats;

CREATE PROCEDURE GetDailyStats()
BEGIN
    SELECT 
        machine_id,
        DATE(FROM_UNIXTIME(schedule_datetime)) AS day,
        COUNT(*) AS total_appointments,
        SUM(duration) AS total_duration,
        SUM(attended) AS total_attended
    FROM schedule
    GROUP BY machine_id, day;
END //

DELIMITER ;