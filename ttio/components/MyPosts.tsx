import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function MyPosts() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select("id,title, user_id")
    .eq("user_id", user?.id);

  return (
    <div className="bg-white text-black flex flex-col">
      <h1>My Posts:</h1>
      {posts?.map((post) => (
        <ul key={post.id}>
          <li>{post.title}</li>
        </ul>
      ))}
    </div>
  );
}
