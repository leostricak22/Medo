DELIMITER //

DROP PROCEDURE IF EXISTS GetWeeklyStats;


CREATE PROCEDURE GetWeeklyStats()
BEGIN
    SELECT 
        machine_id,
        YEARWEEK(FROM_UNIXTIME(schedule_datetime), 1) AS week,
        COUNT(*) AS total_appointments,
        SUM(duration) AS total_duration,
        SUM(attended) AS total_attended
    FROM schedule
    GROUP BY machine_id, week;
END //

DELIMITER ;