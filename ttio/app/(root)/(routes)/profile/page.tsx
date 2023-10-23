import ProfileSection from "@/components/ProfileSection";
import db from "@/lib/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const ProfilePage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { user } = (await supabase.auth.getUser()).data;
  if (!user) return;
  const profile = await db.profile.findUnique({
    where:{
      userId: user?.id
    }
  })
  return (
    <>
      <ProfileSection user={user} profile={profile}/>
    </>
  );
};

export default ProfilePage;
