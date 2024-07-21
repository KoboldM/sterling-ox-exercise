
import { redirect } from "next/navigation";
import Button from "../../../components/button/button";
import { createClient } from "../../../utils/supabase/server";
import { headers } from "next/headers";
import { randomBytes } from "node:crypto";

export default async function PostID({ params }) {
    const slug = parseInt(params.slug[0])
    const currentURL = headers().get('referer')
    const supabase = createClient()
	const { data: post, errorGetPost } = await supabase
        .from('post')
        .select()
        .eq('id', slug)
    const { data: comments, errorGetComments } = await supabase
        .from('comment')
        .select()
        .eq('post_id', slug)

    const { data: user, errorGetUser } = await supabase.auth.getUser()

    const queryPost = post[0]
    const localDate = new Date(queryPost.created_at).toLocaleString()

    async function addComment(formData) {
        'use server'
        const supabaseAddComment = createClient()
        let fileName = ''
        let image_url = ''

        const { data: user, errorGetUser } = await supabaseAddComment.auth.getUser()

        if (formData.get('file').type === 'image/jpeg' || formData.get('file').type === 'image/gif' || formData.get('file').type === 'image/png') {
            fileName = randomBytes(20).toString('hex')
            const {data, error} = await supabaseAddComment
            .storage.from('image')
            .upload(`${fileName}`,formData.get('file'))

            if(error) {
                console.log(error)
            }

            const {data: publicURL, getPublicURLError} = supabaseAddComment
            .storage.from('image')
            .getPublicUrl(`${fileName}`)

            image_url = publicURL.publicUrl
        }

        const { data: comment, error } = await supabaseAddComment
        .from('comment')
        .insert({
            post_id: slug,
            posted_by: user.user.user_metadata.preferred_username,
            content: formData.get('content'),
            image_url
        })
        .select()
        if(!error) {
            redirect(currentURL)
        }
    }

    return(
        <div className="flex min-h-screen flex-col items-center justify-between p-24 text-center">
            <div>
                <h1 className="text-4xl">
                    {queryPost.title}
                </h1>
                <h2 className="text-md">
                    Author: {queryPost.posted_by}
                </h2>
                <h3 className="text-sm">
                    Posted on {localDate}
                </h3>

                <p className="mt-4">
                    {queryPost.content}
                </p>
            </div>

            <div className="w-full border-t text-left">
                <h3 className="text-lg">
                    Comments:
                </h3>
                {comments.map(comment => {
                    let localDate = new Date(comment.created_at).toLocaleTimeString()
                    return(
                    <div key={comment.id}>
                        {comment.posted_by} - {comment.content}
                        - {localDate}
                    </div>)
                })}

                {
                    user.user ?
                    <div>
                        <form action={addComment} id='formpost'>
                            <input required type='text' id='content' name='content' placeholder='Comment'/>
                            <input type='file' id='file' name='file' accept='image/jpeg, image/gif, image/png'/>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                    : <></>
                }
            </div>
        </div>
    )
}