export default function makeSession(sessionInfo){

      const {
        courseName,
        classGroups,
        descriptionCourse,
        numOfBlocks,
        timeOfBlocks,
      } = sessionInfo;
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

      function validate()
}