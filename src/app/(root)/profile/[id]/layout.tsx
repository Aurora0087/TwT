import ProfileCard from "@/components/cards/ProfileCard";
import BackButton from "@/components/shared/BackButton";
import ProfileNav from "@/components/shared/ProfileNav";
import { fatchUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function RootLayout({
    children, params
}: Readonly<{
    children: React.ReactNode,
    params: { id: string }
}>) {
    const { sessionClaims } = auth()

    const currentUserId = sessionClaims?.userId as string
    const user = await fatchUser(params.id)

    const isAuther = user?._id === currentUserId
    return (
        <>
            
            <section className=" px-4 flex flex-col min-h-screen">
                <BackButton />
                {
                    user === undefined || null  ?
                        (
                            <div className=' w-full h-full bg-slate-500/10 text-center p-10 rounded-xl'>
                                <h3 className=' text-2xl font-semibold text-slate-400 capitalize'>
                                    user dont exist
                                </h3>
                            </div>
                        ) :
                        (
                            <div className=' w-full flex flex-col'>
                                <ProfileCard
                                    uId={currentUserId}
                                    username={user.username}
                                    firstName={user.firstName}
                                    lastName={user.lastName}
                                    avater={user.avater}
                                    bio={user.bio}
                                    profilebg={user.profilebg}
                                    followers={user.followers}
                                    following={user.following}
                                    tweetes={user.tweetes}
                                    likedtweet={user.likedtweet}
                                    isAuther={isAuther}
                                    joined={user.createdAt.toString()}
                                />
                                <ProfileNav id={params.id} />
                                {children}
                            </div>
                        )
                }
            </section>
        </>
    )
}