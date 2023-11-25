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

    generateSchedule: async function (patient_id) {
        let sql = "call sp_generate_patient_schedule(?) ";
        let result = (await db_funct.db_select(sql, [patient_id]))[0];
        return result;
    },
    patients: async function () {
        let sql = "SELECT * FROM patient_data;";
        let result = (await db_funct.db_select(sql, []));
        return result;
    }, insertPatient: async function (patient) {
        let query = 'INSERT INTO patient_data SET ?';


        await db_funct.db_select(query, [patient], (err, result) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).send('Patient created');
        });
    },


}