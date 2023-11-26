const db_funct = require("../database/functions");


module.exports = {
    cancer: async function () {
        let sql = "SELECT * FROM cancer;";
        let result = (await db_funct.db_select(sql, []));
        return result;
    },
    machines: async function () {
        let sql = "SELECT * FROM machines;";
        let result = (await db_funct.db_select(sql, []));
        return result;
    },
    schedules: async function () {
        let sql = "SELECT * from schedule order by schedule_datetime desc";
        let result = (await db_funct.db_select(sql, []));
        return result;
    },
    scheduleForUser: async function (patient_id) {
        let sql = "SELECT * from schedule where patient_id = ? ";
        let result = (await db_funct.db_select(sql, [patient_id]));
        return result;
    },
    getPatientId: async function (user_id) {
        let sql = "SELECT max(patient_id) as patient_id from patient_data where user_id = ? ";
        let result = (await db_funct.db_select(sql, [user_id]))[0];
        return result;
    },

    generateSchedule: async function (patient_id,duration) {
        let sql = "call sp_generate_patient_schedule(?,?) ";
        let result = (await db_funct.db_select(sql, [patient_id,duration]))[0];
        return result;
    },
    patients: async function () {
        let sql = "SELECT patient_data.*,users.user_fname FROM patient_data inner join users on (patient_data.user_id = users.user_id) ;";
        let result = (await db_funct.db_select(sql, []));
        return result;
    }, insertPatient: async function (patient) {
        let query = 'INSERT INTO patient_data SET ?';


        await db_funct.db_select(query, [patient], (err, result) => {
            if (err) {p
                console.error('Error executing query: ' + err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).send('Patient created');
        });
    }, machinesCancer: async function (cancer_id) {
        let sql = `select machines.* from treatment_machines inner join cancer on (treatment_machines.cancer_id = cancer.cancer_id)
        inner join machines on (treatment_machines.machine_id = machines.machine_id)
        where cancer.cancer_id=?;`;
        let result = (await db_funct.db_select(sql, [cancer_id]));
        return result;
    },insertSchedule: async function (schedule) {
        let query = 'INSERT INTO schedule SET ?';


        await db_funct.db_select(query, [schedule], (err, result) => {
            if (err) {p
                console.error('Error executing query: ' + err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).send('Schedule created');
        });
    },


}