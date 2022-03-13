import FirebaseAuth from "@/components/auth/FirebaseAuth";
import { Link, Box } from "@chakra-ui/react";

const Auth = () => {
  return (
    <Box>
      <FirebaseAuth />
      <Link href="/">Go Home</Link>
    </Box>
  );
};

export default Auth;
