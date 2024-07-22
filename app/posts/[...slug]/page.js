
import { redirect } from "next/navigation";
import Button from "../../../components/button/button";
import { createClient } from "../../../utils/supabase/server";
import { randomBytes } from "node:crypto";
import Image from "next/image";

export default async function PostID({ params }) {
    const slug = parseInt(params.slug[0])
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
            redirect(`/posts/${slug}`)
        }
    }

    return(
        <div className="flex min-h-screen flex-col items-center p-24 pt-4 text-center">
            <div className='mb-16'>
                <h1 className="text-4xl">
                    {queryPost.title}
                </h1>
                <h2 className="text-md">
                    Author: {queryPost.posted_by}
                </h2>
                <h3 className="text-sm">
                    Posted on {localDate}
                </h3>

                <div className="mt-4">
                    <div className="p-6">
                        {queryPost.content}
                    </div>
                    <div className='h-96 w-96 m-auto relative'>
                        {!queryPost.image_url ? <></> :
                            <Image
                                src={queryPost.image_url}
                                alt={`${queryPost.title} image`}
                                layout="fill"
                                unoptimized
                            />
                        }
                    </div>
                </div>
            </div>

            <div className="w-full border-t text-left">
                { user.user ?
                    <div>
                        <form className='flex flex-col' action={addComment} id='formpost'>
                            <textarea
                                className='w-1/3 my-4 border-2 rounded-xl p-2'
                                required
                                id='content'
                                name='content'
                                placeholder='Add Comment'
                                maxLength={600}
                                // cols={100}
                                rows={4}
                                style={{
                                    resize: 'none'
                                }}
                            />
                            <div className='max-w-max'>
                                <input type="file" id='file' name='file' accept='image/jpeg, image/gif, image/png'
                                    class="text-sm text-grey-500 mb-2
                                        file:mr-5 file:py-2 file:px-6
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-medium
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:cursor-pointer hover:file:bg-amber-50
                                        hover:file:text-amber-700
                                        file:transition-colors file:duration-200"
                                />
                            </div>

                            <button type='submit' 
                                className="bg-blue-50 w-16
                                py-1 rounded-full text-blue-700 border-0
                                text-sm font-medium hover:bg-amber-50 hover:text-amber-700
                                transition-colors duration-200
                            ">
                                Submit
                            </button>
                        </form>
                    </div>
                    : <></>
                }
                {comments.map(comment => {
                    let localDate = new Date(comment.created_at).toLocaleString()
                    return(
                        <div key={comment.id} className='border-b-2 py-4'>
                            <div className="flex flex-row">
                                <div className='font-bold'>
                                    {comment.posted_by}
                                </div>
                                
                                <div className='text-sm self-center ml-2'>
                                    {localDate}
                                </div>
                            </div>

                            <div className="pt-2">
                                {comment.content}
                            </div>

                            { !comment.image_url ? <></> :
                                <div className='h-96 w-96 relative'>
                                    {!comment.image_url ? <></> :
                                        <Image
                                            src={comment.image_url}
                                            alt={`${comment.title} image`}
                                            layout="fill"
                                            unoptimized
                                        />
                                    }
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}