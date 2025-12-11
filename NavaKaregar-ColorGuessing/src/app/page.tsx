import { Box, Button } from "@mui/material";
import Link from "next/link";

const Home = () => {
  return (
    <Box className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
      <p className="text-gray-600 mb-6">
        Ready to play the Color Guessing Game?
      </p>
      <Link href="/game">
        <Button variant="contained" color="primary" size="large">
          Start Game
        </Button>
      </Link>
    </Box>
  );
};

export default Home;
