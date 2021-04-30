const path = require("path");
const { createSession, createBlock, checkIn, createStudentBlock } = require("../requests/Sessions.Requests");

const SessionsEndpoint = (app) => {
  app.post("/createSession", async (req, res) => {
    try {

      console.log(req.body)
      const {courseName, classGroups, descriptionCourse, numOfBlocks, timeOfBlocks}  = req.body;
      const teacherId = 1;
      const geoLat = 55.70372700;
      const geoLong = 12.53755300;

      const sessionData = [courseName, descriptionCourse, classGroups, teacherId, geoLat, geoLong];

      const sessionId = await createSession(sessionData);

      const blocksData = [sessionId, timeOfBlocks];

      let blockNum = numOfBlocks;

        while(blockNum != 0){
            await createBlock(blocksData);
            blockNum--;            
        } 

        

        //use block Id instead of sessionId
      //res.status(200).json({ msg: "session created", attendanceCode: sessionId});
      //res.sendFile('studentPage.html', {root: path.join(__dirname, '../../views')})
      res.redirect("/teacherPage");
      
    } catch (error) {
      console.log("Endpoint error: "+error);
      res.status(200).json({ msg: "Could not create new Order" });
    }
  });

  app.get("/checkIn", async (req, res) => {
    try {

      //const data  = req.body;
      const { attendanceCode } = req.body;
      const studentId = 1;

      const booleanCode = await checkIn(attendanceCode);

      if(booleanCode){
        await createStudentBlock(attendanceCode, studentId);
        res.redirect("/teacherPage");
      }else{
        res.redirect("/loginForm");
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
      console.log("Endpoint error: "+error);
      res.status(200).json({ msg: "Could not create block student row" });
    }
  });

};


module.exports = SessionsEndpoint;