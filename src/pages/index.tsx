import { Button, chakra, Container, Grid, GridItem } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";

interface FeatureProps {
  heading: string;
  id: string;
}

const Feature = ({ heading, id }: FeatureProps) => {
  return (
    <GridItem margin={5} padding={5} border="1px" rounded="md" boxShadow="xl">
      <chakra.h5 fontSize="xl" margin={2} fontWeight="400">
        {heading}
      </chakra.h5>
      <Link href={`/event/${id}`}>
        <Button
          display={{ md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={200}
          color={"white"}
          bg={"blue.400"}
          _hover={{
            bg: "blue.300",
          }}
        >
          Event Detail
        </Button>
      </Link>
    </GridItem>
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["event.getEvents"]);

  return (
    <>
      <Head>
        <title>Events Ethiopia Clone</title>
        <meta name="description" content="Events Ethiopia Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="2xl" margin={4}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={{ base: "18", sm: "12", md: "16" }}
        >
          {data ? (
            data.map((item) => (
              <div key={item.id}>
                <Feature heading={item.title} id={item.id} />
              </div>
            ))
          ) : (
            <p>Loading..</p>
          )}
          {data?.length! < 1 && <>No events</>}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
