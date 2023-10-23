import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;
  const user = (await supabase.auth.getUser()).data.user || null;

  console.log('[USER]', user);
  
  

  return (
    <div className="h-full w-full">
      <Header user={user} />
      <main className="h-full">
        <AuthProvider accessToken={accessToken!}>
          {children}
        </AuthProvider>
      </main>
      <Toaster />
    </div>
  );
}

export default RootLayout;