import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import MyPosts from '../components/MyPosts'
import ProfileForm from '@/components/profileform'



export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log(user, 'INDEX');
  
  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center items-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
        <h1 className='text-black'>TTIOT - the truth is out there</h1>
      </nav>

      {user ? (
        <div className='text-black flex flex-col items-center'>
            <MyPosts />
            
            <ProfileForm/>
          </div>
      ) : (
        <></>
      )}

  
    </div>
  )
}
