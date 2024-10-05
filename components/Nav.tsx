import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import AuthButton from "./AuthButton";

export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CourseGPT
            </Typography>
            <AuthButton />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
