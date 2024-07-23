// import { Form, FormField } from "@/components/ui/form";
import { createClient } from "../utils/supabase/server";
import Link from "next/link";

export default async function Home() {
	const supabase = createClient()
	const { data: user, errorGetUser } = await supabase.auth.getUser()
	const { data: post, error } = await supabase
	.from('post')
	.select()

    async function signOut() {
        'use server'

        const supabase = createClient();
        const { error } = await supabase.auth.signOut()
        if(!error) {
            redirect('/')
        }
    }

	return (
		<div className='grid grid-rows-12 max-h-screen w-full'>
			<div className='text-4xl row-span-1 text-center self-center h-full py-4 pb-7'>Company Blabber</div>

			<div className="row-span-10 h-full items-center px-24 overflow-auto">
				<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
				{ post.map(datum => (
					<Link
                        className='text-center rounded-2xl hover:cursor-pointer bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200'
                        key={datum.id}
                        href={`posts/${datum.id}`}
                    >
						<h1 className='text-2xl pt-2'>{datum.title}</h1>
						<h2 className='text-lg'>{datum.posted_by}</h2>
						<p className='p-4 truncate'>
							{datum.content}
						</p>
					</Link>
					))
				}
				</div>
			</div>

			<div className='row-span-1 text-center p-4 self-center'>
			{ user.user ?
                <div className='flex flex-row justify-center items-center gap-4'>
                    <div>
                        <Link href='/addpost'
                            className='bg-blue-50 w-16 px-8 py-3
                                rounded-full text-blue-700 border-0
                                text-sm font-medium hover:bg-amber-50 hover:text-amber-700
                                transition-colors duration-200'
                        >
                            Add Your Own Post
                        </Link>
                    </div>

                    <form action={signOut} className='self-end'>
                        <button type='submit'
                            className="bg-blue-50
                            rounded-full text-blue-700 border-0
                            text-sm font-medium hover:bg-red-400 hover:text-white
                            transition-colors duration-200 flex flex-row gap-2 px-8 py-3"
                        >
                            Logout
                        </button>
                    </form>
                </div>
                :
                <Link href='/login'
                    className='bg-blue-50 w-16 px-8 py-3
                        rounded-full text-blue-700 border-0
                        text-sm font-medium hover:bg-amber-50 hover:text-amber-700
                        transition-colors duration-200'
                >
                    Login
                </Link>
			}

			</div>
		</div>
	);
}