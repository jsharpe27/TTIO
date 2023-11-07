import ProfileSection from "@/components/ProfileSection";
import db from "@/lib/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const ProfilePage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { user } = (await supabase.auth.getUser()).data;
  if (!user) return;
  let profile;
  profile = await db.profile.findUnique({
    where:{
      user_id: user?.id
    }
  })
  if(!profile) {
    profile =  await db.profile.create({
      data: {
        user_id: user?.id,
        email: user.email ? user.email : ""
      },
    });
  }
  return (
    <>
      <ProfileSection user={user} profile={profile}/>
    </>
  );
};

export default ProfilePage;
