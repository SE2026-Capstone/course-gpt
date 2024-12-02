type Course = {
  courseCode: string;
  courseName: string;
  courseDescription: string;
  similarityScore: number;
  easyRating: number;
  usefulRating: number;
};

export default function CourseList({ courses }: { courses: Course[] }) {
  return (
    <Box width="100%" textAlign="center">
      <Typography my="1rem" variant="h4">
        Courses
      </Typography>
      <Box
        boxSizing="border-box"
        overflow="scroll"
        border="2px solid #D6D6D6"
        borderRadius="16px"
        display="flex"
        flexDirection="column"
        gap="2rem"
        padding="2rem"
        textAlign="start"
      >
        {courses.map((course) => (
          <Box
            key={course.courseCode}
            borderRadius="1rem"
            bgcolor="grey.200"
            padding="1rem"
          >
            <Box display="flex" mb="1rem">
              <Box flexGrow={1}>
                <Typography variant="h6">{course.courseCode}</Typography>
                <Typography variant="body1">{course.courseName}</Typography>
              </Box>
              <Box display="flex" gap="0.5rem">
                <CircularStat
                  percentage={course.similarityScore}
                  text="Similarity"
                />
                <CircularStat percentage={course.easyRating} text="Easy" />
                <CircularStat percentage={course.usefulRating} text="Useful" />
              </Box>
            </Box>
            <Typography variant="body2">{course.courseDescription}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function CircularStat({
  percentage,
  text,
}: {
  percentage: number;
  text: string;
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="2px"
      alignItems="center"
      width="min-content"
    >
      <CircularProgressBar percentage={percentage} />
      <Typography fontWeight={500} fontSize="12px">
        {text}
      </Typography>
    </Box>
  );
}
