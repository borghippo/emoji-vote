// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";
import { getOptionsForVote } from "../../utils/randomEmoji";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body.data;
    const id = req.body.id;
    if (id == data[0].id) {
      const result = await prisma.vote.create({
        data: {
          votedForId: data[0].id,
          votedAgainstId: data[1].id,
        },
      });
      res.json(result);
    } else {
      const result = await prisma.vote.create({
        data: {
          votedForId: data[1].id,
          votedAgainstId: data[0].id,
        },
      });
      res.json(result);
    }
  } else {
    const [firstEmoji, secondEmoji] = getOptionsForVote();
    const emojis = await prisma.emoji.findMany({
      where: {
        id: {
          in: [firstEmoji, secondEmoji],
        },
      },
    });
    res.json(emojis);
  }
}
