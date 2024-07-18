import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route.js"
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import Header from "@/components/header/header";

import { supabase } from "./supabase.js";

export default async function Home({posts}) {
  const session = await getServerSession(authOptions)

  const { data, error } = await supabase
  .schema('next_auth')
  .from('post')
  .select()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Header/> */}
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      {/* {data[0].name} */}

      {/* {session ? <Button>Add Post</Button> : <></>} */}

      <div className='w-full grid grid-cols-2 gap-4'>
        {
          data.map(datum => (
            <div className='text-center' key={datum.id}>
              <h1 className='text-4xl'>{datum.title}</h1>
              <p className='p-4'>
                {datum.content}
              </p>
            </div>
          ))
        }
      </div>

      <Button>Add Post</Button>

      </main>
  );
}