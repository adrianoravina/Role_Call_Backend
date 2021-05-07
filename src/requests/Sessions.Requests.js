const { mysqlConnect } = require("../database/Connection");

const createSession = async (data) => {
  const sql = "CALL SP_CREATE_SESSION(?,?,?,?,?,?)";

  return await mysqlConnect
    .promise()
    .query(sql, data)
    .then(([rows, fields]) => {
      return rows[0][0].session_id;
    })
    .catch(console.log);
};

const createBlock = async (blocksData) => {
  const sql = "INSERT INTO blocks (b_sessionId, b_duration_min) VALUES(?,?)";

  console.log(blocksData);

  mysqlConnect.query(sql, blocksData, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
  });
};

const checkIn = async (attendanceCode) => {
  const sql =
    "SELECT s_date FROM blocks as b LEFT JOIN sessions as s ON b.b_sessionId = s.session_Id " +
    "where block_id =" +
    attendanceCode;

  const results = await mysqlConnect
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      return rows[0].s_date;
    })
    .catch(console.log);

  if (results == undefined) {
    console.log("Wrong attendance code.");
    return false;
  } else {
    console.log("Correct attendance code.");
    return true;
  }
};

const createStudentBlock = async (attendanceCode, studentId) => {
  const sql =
    "INSERT INTO blocks_students (b_s_blockId, b_s_studentId) VALUES(?,?)";

  mysqlConnect.query(sql, [attendanceCode, studentId], (error, results) => {
    if (error) {
      return console.error(error.message);
    }
  });
};

const getTeacherSessions = async (teacherId) => {
  const sql = "SELECT * FROM sessions WHERE s_teacherId = " + teacherId;

  const results = await mysqlConnect
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      return rows;
    })
    .catch(console.log);

  return results;
};

const getTeacherBlocks = async (sessionId) => {
  const sql = "SELECT * FROM blocks WHERE b_sessionId = " + sessionId;

  const results = await mysqlConnect
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      return rows;
    })
    .catch(console.log);

  return results;
};

const getStudentStatistics = async (teacherId) => {
  const sql = "SELECT * FROM sessions WHERE s_teacherId = " + teacherId;

  const results = await mysqlConnect
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      return rows;
    })
    .catch(console.log);

  return results;
};

module.exports = {
  createSession,
  createBlock,
  checkIn,
  createStudentBlock,
  getTeacherSessions,
  getTeacherBlocks,
  getStudentStatistics,
};
