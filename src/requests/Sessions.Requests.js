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
  const sql = "INSERT INTO blocks (b_sessionId, b_duration_min, b_status) VALUES(?,?,?)";

  console.log(blocksData);

  mysqlConnect.query(sql, blocksData, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
  });
};

process.on("message", async (message) => {

  const response = await checkIn(message.attendanceCode)

  console.log(response);
  process.send(response)
  process.exit()
})

const checkIn = async (attendanceCode) => {
  const sql =
    "SELECT s_date, now() as timeNow FROM blocks as b LEFT JOIN sessions as s ON b.b_sessionId = s.session_Id " +
    "where block_id =" +
    attendanceCode;

  const results = await mysqlConnect
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch(console.log);

  const minMargin = results.timeNow - results.s_date;
  const maxMinutes = 900000;

  if (results == undefined) {
    return [false, "Wrong attendance code :("];
  } else {
    if (maxMinutes < minMargin) {
      return [false, "Time has expired!"];
    }
  }
  return [true, "Correct attendance code"];
};




/*
const checkIn = async (attendanceCode) => {
  const sql =
    "SELECT s_date, now() as timeNow FROM blocks as b LEFT JOIN sessions as s ON b.b_sessionId = s.session_Id " +
    "where block_id =" +
    attendanceCode;

  const results = await mysqlConnect
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch(console.log);

  const minMargin = results.timeNow - results.s_date;
  const maxMinutes = 900000;

  if (results == undefined) {
    return [false, "Wrong attendance code :("];
  } else {
    if (maxMinutes < minMargin) {
      return [false, "Time has expired!"];
    }
  }
  return [true, "Correct attendance code"];
};

*/

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

const getStudentStatistics = async (studentId) => {
  const sql = "CALL SP_STUDENT_STATS(?)";

  return await mysqlConnect
    .promise()
    .query(sql, studentId)
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch(console.log);
};

const startBlock = async (blockId) => {
  const sql = "UPDATE blocks SET b_status = 'In Session' WHERE block_id = (?)";

  return await mysqlConnect
    .promise()
    .query(sql, blockId)
    .then(([rows, fields]) => {
      return rows;
    })
    .catch(console.log);
};

module.exports = {
  createSession,
  createBlock,
  checkIn,
  createStudentBlock,
  getTeacherSessions,
  getTeacherBlocks,
  getStudentStatistics,
  startBlock,
};
