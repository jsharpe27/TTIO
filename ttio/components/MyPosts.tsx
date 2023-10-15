import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function MyPosts() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    
const { data: posts} = await supabase
.from('posts')
.select('id,title, user_id')

const {
    data: { user },
  } = await supabase.auth.getUser()


  return (
    <div className='bg-white text-black flex flex-col'>
        <h1>My Posts:</h1>
        { posts?.map((post) => (
            post.user_id === (user?.id ?? null) ? (
                <ul key={post.id}>
                    <li>{post.title}</li>
                </ul>
            ) : (
                <></>
            )
        ))}
    </div>
  )
}
