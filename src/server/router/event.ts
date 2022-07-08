import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createEventSchema } from "../../utils/schema";
import { createRouter } from "./context";

export const eventRouter = createRouter()
  .query("getEvents", {
    async resolve({ ctx }) {
      let start = new Date();
      start.setHours(0, 0, 0, 0);
      return await ctx.prisma.event.findMany({
        where: {
          date: {
            gte: start,
          },
        },
        take: 10,
        orderBy: {
          date: "asc",
        },
      });
    },
  })
  .query("getEvent", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      return await ctx.prisma.event.findUnique({
        where: {
          id,
        },
      });
    },
  })
  .query("getEventByDate", {
    input: z.object({
      date: z.date(),
    }),
    async resolve({ ctx, input }) {
      const { date } = input;
      return await ctx.prisma.event.findMany({
        where: {
          date,
        },
      });
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not logged in",
      });
    }
    return next();
  })
  .mutation("createEvent", {
    input: createEventSchema,
    async resolve({ ctx, input }) {
      console.log(ctx.session?.user?.email);

      const event = await ctx.prisma.event.create({
        data: {
          ...input,
          date: new Date(input.date),
          author: {
            connect: {
              email: ctx.session?.user?.email as string,
            },
          },
        },
      });
      return event;
    },
  });
