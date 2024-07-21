import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";

export default async function AddPost() {
    async function addPost(formData) {
        'use server'
        const supabase = createClient()
        let fileName = ''
        let image_url = ''
        
        const { data: user, errorGetUser } = await supabase.auth.getUser()
        if(errorGetUser) {
            console.log(errorGetUser)
        }
        
        if (formData.get('file')) {
            fileName = randomBytes(20).toString('hex')
            const {data, error} = await supabase
            .storage.from('image')
            .upload(`${fileName}`,formData.get('file'))

            if(error) {
                console.log(error)
            }

            const {data: publicURL, getPublicURLError} = supabase
            .storage.from('image')
            .getPublicUrl(`${fileName}`)

            image_url = publicURL.publicUrl
        }

        const { data, error } = await supabase
            .from('post')
            .insert({
                posted_by: user.user.user_metadata.preferred_username,
                title: formData.get('title'),
                content: formData.get('content'),
                image_url
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
            <input type='file' accept='image/jpeg, image/gif, image/png' name='file' id='file'/>
            <button type='submit'>Submit</button>
        </form>
      </main>
    );
  }