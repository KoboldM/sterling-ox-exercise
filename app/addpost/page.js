import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AddPost() {
    async function addPost(formData) {
        'use server'

        const supabase = createClient()
        const { data: user, errorGetUser } = await supabase.auth.getUser()
        if(errorGetUser) {
            console.log(errorGetUser)
        }

        const { data, error } = await supabase
            .from('post')
            .insert({
                posted_by: user.user.user_metadata.preferred_username,
                title: formData.get('title'),
                content: formData.get('content')
            })
            .select()
        if(!error) {
            redirect(`/posts/${data[0].id}`)
        }
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form action={addPost} id='formpost'>
            <input required placeholder='Your Post Title' type='text' name='title' id='title'/>
            <input required placeholder='Your Post Content' type='text' name='content' id='content'/>
            <button type='submit'>Submit</button>
        </form>
      </main>
    );
  }