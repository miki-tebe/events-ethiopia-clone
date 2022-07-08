import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginComponent() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user?.name?.split(' ')[0]} <br />
        <Button
          display={{ md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"blue.400"}
          _hover={{
            bg: "blue.300",
          }}
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </>
    );
  }
  return (
    <Button
      display={{ md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"blue.400"}
      _hover={{
        bg: "blue.300",
      }}
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  );
}
