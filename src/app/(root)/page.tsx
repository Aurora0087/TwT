import TweetCard from "@/components/cards/TweetCard";
import LoadPosts from "@/components/shared/LoadPosts";
import { fatchTweets } from "@/lib/actions/tweet.action";
import { formatDateString } from "@/lib/utils";
import { auth } from "@clerk/nextjs";


export default async function Home() {

  const res = await fatchTweets(1,10);
  const { sessionClaims } = auth()
    
  const userId = sessionClaims?.userId as string
  return (
    <div className=" w-full h-full p-6">
      <h1 className=' text-2xl font-semibold pb-4 border-b border-white border-opacity-20'>Home</h1>
      <section className="flex flex-col gap-4 mt-6">
        {
          res.posts.length === 0 ? (
            <div className=" w-full h-fit p-10 grid place-content-center">
              <p className=" text-center">No Tweets Found</p>
            </div>
          
          ) : (
              <>
                {
                  res.posts.map((tweet:any) => {
                    return (
                      <TweetCard
                        key={tweet._id}
                        id={tweet._id}
                        currentUserId={userId}
                        parentId={tweet.parentId}
                        content={tweet.content}
                        author={tweet.author}
                        createdAt={formatDateString(tweet.createdAt)}
                        likes={tweet.likes}
                        comments={tweet.children}
                      />
                    )
                  })
                }
                <LoadPosts isNext={res.isNext} currentUserId={userId} type={"ALL-TWEET"} />
              </>
          )
        }
      </section>
    </div>
  );
}
