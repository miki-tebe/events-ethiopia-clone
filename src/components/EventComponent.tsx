import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import { Event } from "@prisma/client";
import { AtSignIcon, CalendarIcon } from "@chakra-ui/icons";

interface EventComponentProps {
  event: Event & {
    author: {
      name: string | null;
    };
  };
  error?: string;
}

export default function EventComponent({ event }: EventComponentProps) {
  return (
    <Center py={6}>
      <Box
        maxW={"545px"}
        w={"full"}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image alt="event" src={"/images/event.jpg"} layout={"fill"} />
        </Box>
        <Stack>
          <Stack direction={"row"} spacing={2}>
            <CalendarIcon />
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              {event.date?.toDateString()} <AtSignIcon />
              {event.date?.toLocaleTimeString()}
            </Text>

            <Spacer />
            <AtSignIcon alignSelf={"center"} />
            <Text fontWeight={600}>{event.location}</Text>
          </Stack>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {event.title}
          </Heading>
          <Text color={"gray.500"}>{event.description}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{event.author.name}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
