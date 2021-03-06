import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Emoji {
  id: number;
  name: string;
}

export default function Home() {
  const [data, setData] = useState<Emoji[]>([]);
  const [recentVote, setRecentVote] = useState(null);

  const postVote = async (id: number) => {
    const response = await fetch("/api/emojis", {
      method: "POST",
      body: JSON.stringify({ data, id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setRecentVote(await response.json());
  };

  useEffect(() => {
    fetch("/api/emojis")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [recentVote]);

  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center">
      <Head>
        <title>vote</title>
        <meta name="description" content="vote on your favorite emoji" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-4">
        <p className="text-4xl text-center">which do you like better?</p>
      </div>
      {data && (
        <div className="p-8 flex flex-col md:space-x-8 space-y-3 md:items-baseline md:flex-row">
          <EmojiTemplate
            id={data[0]?.id}
            name={data[0]?.name}
            vote={() => postVote(data[0]?.id)}
          />
          <div className="text-3xl text-center">
            <p>or</p>
          </div>
          <EmojiTemplate
            id={data[1]?.id}
            name={data[1]?.name}
            vote={() => postVote(data[1]?.id)}
          />
        </div>
      )}
      <div className="pb-2 text-2xl">
        <Link href={"/results"}>
          <a>results</a>
        </Link>
      </div>
    </div>
  );
}

type EmojiTemplateProps = {
  id: number;
  name: string;
  vote: (id: number) => void;
};

const EmojiTemplate = (props: EmojiTemplateProps) => {
  return (
    <div className="flex flex-col space-y-8 items-center">
      <p className="text-8xl">{props.name}</p>
      <button
        onClick={() => props.vote(props.id)}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        this one
      </button>
    </div>
  );
};
