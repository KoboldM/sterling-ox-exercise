import { supabase } from "./supabase";

import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route.js"
import { Button } from "@/components/ui/button";

export default async function Home(context) {
  // const session = await getServerSession(authOptions)

  // const { data, error } = await supabase
  // .schema('next_auth')
  // .from('users')
  // .select()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      {/* {data[0].name} */}

      <Button>Add Post</Button>
      </main>
  );
}