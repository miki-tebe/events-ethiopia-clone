import { Event } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import EventComponent from "../../components/EventComponent";
import { prisma } from "../../server/db/client";

interface Props {
  event?: Event & {
    author: {
      name: string | null;
    };
  };
  error?: string;
}

const EventDetail = ({ event, error }: Props) => {
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      <Head>
        <title>Events Ethiopia Clone</title>
        <meta name="description" content="Events Ethiopia Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <EventComponent event={event!} />{" "}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return { props: { event } };
  } catch (error: any) {
    return { props: { event: error.message } };
  }
};

export default EventDetail;
