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

        if (formData.get('file').type === 'image/jpeg' || formData.get('file').type === 'image/gif' || formData.get('file').type === 'image/png') {
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
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <form action={addPost} id='formpost' className='flex flex-col gap-4'>
            <input className='border-2 rounded-xl p-2' required placeholder='Your Post Title' type='text' name='title' id='title'/>
            <textarea style={{resize: 'none'}} rows={4} cols={75} className='border-2 rounded-xl p-2' required placeholder='Your Post Content' type='text' name='content' id='content'/>
            <input type='file' accept='image/jpeg, image/gif, image/png' name='file' id='file'
                className="text-sm text-grey-500 mb-2
                file:mr-5 file:py-2 file:px-6
                file:rounded-full file:border-0
                file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-700
                hover:file:cursor-pointer hover:file:bg-amber-50
                hover:file:text-amber-700
                file:transition-colors file:duration-200"
            />
            <button type='submit' 
                className='bg-blue-50 w-16
                    py-1 rounded-full text-blue-700 border-0
                    text-sm font-medium hover:bg-amber-50 hover:text-amber-700
                    transition-colors duration-200'>
            Submit</button>
        </form>
      </main>
    );
  }