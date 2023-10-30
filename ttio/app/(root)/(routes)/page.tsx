import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import {Montserrat} from 'next/font/google'
import { cn } from '@/lib/utils'
import SearchBar from '@/components/SearchBar'
import FilterPosts from '@/components/Filters'

const font = Montserrat({ subsets: ['latin'] })


const RootPage = () => {
  const supabase = createServerComponentClient({ cookies })
  
  return (
    <div
      className={cn('relative w-full h-full flex flex-col gap-y-2 items-center justify-center py-10', font.className)}
    >
      <h1
        className='text-5xl font-bold text-primary uppercase text-center'
      >The Truth is Out There</h1>

      <p
        className='text-xl font-medium text-primary/60 text-center'
      >
        Providing a platform for people to show the world what they have seen.
      </p>

      <SearchBar/>
      <FilterPosts/>
    </div>
  )
}


export default RootPage