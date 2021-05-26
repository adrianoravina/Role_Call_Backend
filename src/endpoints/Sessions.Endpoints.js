const path = require("path");
const {
  createSession,
  createBlock,
  checkIn,
  createStudentBlock,
  getTeacherSessions,
  getTeacherBlocks,
  getStudentStatistics,
  startBlock,
} = require("../requests/Sessions.Requests");

const SessionsEndpoint = (app) => {

  app.post("/createSession", async (req, res) => {
    try {
      console.log(req.body);
      const {
        courseName,
        classGroups,
        descriptionCourse,
        numOfBlocks,
        timeOfBlocks,
      } = req.body;
      const teacherId = 1;
      const geoLat = 55.703727;
      const geoLong = 12.537553;

      const sessionData = [
        courseName,
        descriptionCourse,
        classGroups,
        teacherId,
        geoLat,
        geoLong,
      ];

      const sessionId = await createSession(sessionData);

      const blocksData = [sessionId, timeOfBlocks];

      let blockNum = numOfBlocks;

      while (blockNum != 0) {
        await createBlock(blocksData);
        blockNum--;
      }

      //use block Id instead of sessionId
      //res.status(200).json({ msg: "session created", attendanceCode: sessionId});
      //res.sendFile('studentPage.html', {root: path.join(__dirname, '../../views')})
      res.redirect("/getTeacherSessions");
    } catch (error) {
      console.log("Endpoint error: " + error);
      res.status(200).json({ msg: "Could not create new Order" });
    }
  });

  app.post("/checkIn", async (req, res) => {
    try {
      //const data  = req.body;
      const { attendanceCode } = req.body;
      console.log(attendanceCode);
      const studentId = 1;

      const booleanCode = await checkIn(attendanceCode);

      if (booleanCode) {
        await createStudentBlock(attendanceCode, studentId);
        res.render("studentPage", { correctCode: "true" });
      } else {
        res.render("studentPage", { correctCode: "false" });
      }

      /**
      const str = JSON.stringify(sessionDate).split("T");
      const time = str[1].split(".");
      const codeHour = time[0];
      */

      /**
       console.log(new Date());
      console.log(codeHour);
       */

      //res.status(200).json({ msg: "date retrieved!"});
    } catch (error) {
      console.log("Endpoint error: " + error);
      res.status(200).json({ msg: "Could not create block student row" });
    }
  });

  app.get("/getTeacherSessions", async (req, res) => {
    try {
      const sessions = await getTeacherSessions(1);
      console.log(sessions);

      res.render("teacherSessions", { data: sessions });
    } catch (error) {
      console.log("Endpoint error: " + error);
      res.status(200).json({ msg: "Could not get teacher session" });
    }
  });

  app.post("/getTeacherBlocks", async (req, res) => {
    try {
      const { sessionId } = req.body;

      const blocks = await getTeacherBlocks(sessionId);
      console.log(blocks);

      res.render("teacherBlocks", { data: blocks });
    } catch (error) {
      console.log("Endpoint error: " + error);
      res.status(200).json({ msg: "Could not create block student row" });
    }
  });

  app.get("/studentStatistics", async (req, res) => {
    try {
      const studentId = 2;
      const studentStats = await getStudentStatistics(studentId);

      res.render("studentStatistics", { data: studentStats });
    } catch (error) {
      console.log("Endpoint error: " + error);
      res.status(200).json({ msg: "Could not create block student row" });
    }
  });

  app.post("/startBlock", async (req, res) => {
    try {
      const { blockId } = req.body;
      console.log(blockId);

      const sqlResponse = await startBlock(blockId);

      console.log(sqlResponse);

      //res.render('studentStatistics', {data: studentStats})
    } catch (error) {
      console.log("Endpoint error: " + error);
      res.status(200).json({ msg: "Could not create block student row" });
    }
  });
};

module.exports = SessionsEndpoint;
