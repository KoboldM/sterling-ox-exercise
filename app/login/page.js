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
      <main className="flex flex-col items-center min-h-screen">
        <form
            action={signIn}
            className="flex-1 flex flex-col justify-center items-center"
        >
				<button type='submit' 
                    className="bg-blue-50 w-full
                        rounded-full text-blue-700 border-0
                        text-sm font-medium hover:bg-amber-50 hover:text-amber-700
                        transition-colors duration-200 flex flex-row gap-2 p-4"
                >
                	<Github className="h-4 w-4" /> 
                    Login with Github
				</button>
        </form>
      </main>
    );
  }