import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const RootLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {

  const supabase = createServerComponentClient({ cookies });
  const {user} = (await supabase.auth.getUser()).data

  return ( 
    <div className="h-full w-full">
      <Header
        user={user}
      />
      <main className="h-full">
        {children}
      </main>
      <Toaster/>
    </div>
   );
}
 
export default RootLayout;