import { Box, Typography } from "@mui/material";
import CircularProgressBar from "./CircularProgressBar";

type Course = {
  name: string;
  title: string;
  description: string;
  // TODO
  link?: string;
  // number from 0 to 100
  similarity: number;
  easy: number;
  useful: number;
};

const dummyCourses: Course[] = [
  {
    name: "CS 480",
    title: "Introduction to Machine Learning",
    description: `CS 480 provides an introduction to modeling and algorithmic techniques for machines to learn concepts from data.`,
    similarity: 98,
    easy: 70,
    useful: 45,
  },
  {
    name: "CS 486",
    title: "Introduction to Artificial Intelligence",
    description: `Goals and methods of artificial intelligence. Methods of general problem solving. Knowledge representation and reasoning. Planning. Reasoning about uncertainty. Machine learning. Multi-agent systems. Natural language processing.`,
    similarity: 96,
    easy: 50,
    useful: 86,
  },
];

export default function CourseList() {
  const courses = dummyCourses;
  return (
    <Box width="100%" textAlign="center">
      <Typography my="1rem" variant="h4">
        Courses
      </Typography>
      <Box
        overflow="scroll"
        border="2px solid #D6D6D6"
        borderRadius="16px"
        display="flex"
        flexDirection="column"
        gap="2rem"
        padding="2rem"
        textAlign="start"
      >
        {courses.map((course) => {
          return (
            <Box borderRadius="1rem" bgcolor="grey.200" padding="1rem">
              <Box display="flex" mb="1rem">
                <Box flexGrow={1}>
                  <Typography variant="h6">{course.name}</Typography>
                  <Typography variant="body1">{course.title}</Typography>
                </Box>
                <Box display="flex" gap="0.5rem">
                  <CircularStat
                    percentage={course.similarity}
                    text="Similarity"
                  />
                  <CircularStat percentage={course.easy} text="Easy" />
                  <CircularStat percentage={course.useful} text="Useful" />
                </Box>
              </Box>

              <Typography variant="body2">{course.description}</Typography>
            </Box>
          );
        })}
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
