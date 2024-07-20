

// import { createClient } from "../utils/supabase/server";
import { createClient } from "../../../utils/supabase/server";

export default async function PostID({ params }) {
    const slug = parseInt(params.slug[0])
    const supabase = createClient()
	const { data: post, error } = await supabase
	.from('post')
    .select()
    .eq('id', slug)
    const { data: comments } = await supabase
    .from('comment')
    .select()
    .eq('post_id', slug)

    const queryPost = post[0]
    const localDate = new Date(queryPost.created_at).toLocaleString()

    return(
        <div className="flex min-h-screen flex-col items-center justify-between p-24 text-center">
            <div>
                <h1 className="text-4xl">
                    {queryPost.title}
                </h1>
                <h2 className="text-md">
                    {/* Author: {queryPost.posted_by_name} */}
                    Author: Lorem Ipsum
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
                        {/* {comment.posted_by_name} - {comment.content} */}
                        - {localDate}
                    </div>)
                })}
            </div>
        </div>
    )
}