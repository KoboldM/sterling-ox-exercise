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
      <main className="flex min-h-screen flex-col items-center justify-between">
        <form
            action={signOut}
            className="flex-1 flex justify-center items-center"
        >
				<button type='submit' 
                    className="bg-blue-50 w-full
                    rounded-full text-blue-700 border-0
                    text-sm font-medium hover:bg-amber-50 hover:text-amber-700
                    transition-colors duration-200 flex flex-row gap-2 p-4"
                >
                    Logout
				</button>
        </form>
      </main>
    );
  }