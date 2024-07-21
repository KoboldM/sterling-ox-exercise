// import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { createClient } from "../../utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Login() {
    async function signIn () {
        'use server'

        const supabase = createClient();
        const origin = headers().get('origin');

        const { error, data } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: `${origin}/auth/callback`,
          },
        });
    
        if (error) {
          	console.log(error);
        } else {
          	return redirect(data.url);
        }
    };
    
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form
            action={signIn}
            className="flex-1 flex min-h-screen justify-center items-center"
        >
            {/* <Button type='submit'> */}
				<button type='submit'>
                	<Github className="mr-2 h-4 w-4" /> Login with Github
				</button>
            {/* </Button> */}
        </form>
      </main>
    );
  }