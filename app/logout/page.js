// import { Button } from "@/components/ui/button";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

export default function Login() {
    async function signOut() {
        'use server'

        const supabase = createClient();
        const { error } = await supabase.auth.signOut()
        if(!error) {
            redirect('/')
        }
    }
    
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form
            action={signOut}
            className="flex-1 flex min-h-screen justify-center items-center"
        >
            {/* <Button type='submit'> */}
				<button type='submit'>
                    Logout
				</button>
            {/* </Button> */}
        </form>
      </main>
    );
  }