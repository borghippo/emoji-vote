import Link from "next/link";
import { prisma } from "../utils/prisma";

export interface Emoji {
  id: number;
  name: string;
  _count: {
    VoteAgainst: 6;
    VoteFor: 19;
  };
}

type EmojiQueryResult = Promise<
  | {
      _count: {
        VoteFor: number;
        VoteAgainst: number;
      };
      id: number;
      name: string;
    }[]
  | undefined
>;

const getEmojisInOrder = async () => {
  return await prisma?.emoji.findMany({
    orderBy: {
      VoteFor: { _count: "desc" },
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });
};

export default function Results(props: EmojiQueryResult) {
  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center">
      <div className="pt-4">
        <p className="text-4xl text-center">results</p>
      </div>
      <div>
        {Object.entries(props).map((emoji) => {
          return emoji[1].map((pic: Emoji, index: number) => {
            return (
              <li key={index} className="list-none text-2xl">
                {pic.name}
                {" - votes for: "}
                {pic._count.VoteFor}
              </li>
            );
          });
        })}
      </div>
      <div>
        <Link href={"/"}>
          <a className="text-xl pb-2">back to voting</a>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const orderedEmojis = await getEmojisInOrder();
  return {
    props: { emojis: orderedEmojis },
  };
}
