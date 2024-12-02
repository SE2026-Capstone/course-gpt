import { Box, Typography, Button } from "@mui/material";

type Course = {
  courseCode: string;
  courseName: string;
  courseDescription: string;
  similarityScore: number;
};

export default function CourseList({ courses }: { courses: Course[] }) {
  const generateUWFlowLink = (courseCode: string) =>
    `https://uwflow.com/course/${courseCode.toLowerCase()}`;

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
        {courses?.map((course) => (
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
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => window.open(generateUWFlowLink(course.courseCode), "_blank")}
                >
                  View on UW Flow
                </Button>
              </Box>
            </Box>
            <Typography variant="body2">{course.courseDescription}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}