import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


const RootPage = () => {
  const supabase = createServerComponentClient({ cookies })
  
  return (
    <div
      className='w-full h-full flex flex-col items-center justify-center'
    >
      
    </div>
  )
}


export default RootPage