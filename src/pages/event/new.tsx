import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateEventInput } from "../../utils/schema";
import { trpc } from "../../utils/trpc";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

const CreateEvent: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const { handleSubmit, register } = useForm<CreateEventInput>();

  const { mutate, error } = trpc.useMutation(["event.createEvent"], {
    onSuccess: ({ id }) => {
      toast({
        title: "Event created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push(`/event/${id}`);
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: CreateEventInput) => {
    mutate(data);
  };
  return (
    <Flex
      minH={"10vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Create Event
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="title" isRequired>
            <FormLabel>Event title</FormLabel>
            <Input
              placeholder="event-title"
              _placeholder={{ color: "gray.500" }}
              type="text"
              {...register("title")}
            />
          </FormControl>
          <FormControl id="location">
            <FormLabel>Event location</FormLabel>
            <Input
              placeholder="event-location/online"
              _placeholder={{ color: "gray.500" }}
              type="text"
              {...register("location")}
            />
          </FormControl>
          <FormControl id="date" isRequired>
            <FormLabel>Event date and time</FormLabel>
            <Input
              placeholder="event-date-and-time"
              _placeholder={{ color: "gray.500" }}
              type="datetime-local"
              {...register("date")}
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Event description</FormLabel>
            <Textarea
              placeholder="event-description"
              rows={6}
              {...register("description")}
            />
          </FormControl>
          <Stack spacing={6} mt={2}>
            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default CreateEvent;
