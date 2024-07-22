// import { Form, FormField } from "@/components/ui/form";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import Button from '../components/button/button'
import Link from "next/link";

export default async function Home() {
	const supabase = createClient()
	const { data: user, errorGetUser } = await supabase.auth.getUser()
	const { data: post, error } = await supabase
	.from('post')
	.select()

	async function goAddPost() {
		'use server'
		redirect('/addpost')
	}

	async function goLogin() {
		'use server'
		redirect('/')
	}

	return (
		<div className='grid grid-rows-6 w-full '>
			<div className='row-span-1 text-4xl text-center pt-4'>Company Blabber</div>

			<main className="row-span-5 flex flex-col items-center px-24">
				<div className='w-full grid grid-cols-2 gap-4'>
				{ post.map(datum => (
					<Link
                        className='text-center rounded-2xl hover:cursor-pointer bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-150'
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
			</main>

			<div className='row-span-1 text-center p-4'>
			{ user.user ?
			<Button
				text='Add Your Own Post'
				onClick={goAddPost}
			>
			</Button>
			:
			<Button
				text='Login to add to your own post'
				onClick={goLogin}
			>
			</Button>
			}

			</div>
		</div>
	);
}