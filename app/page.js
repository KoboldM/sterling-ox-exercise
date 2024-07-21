// import { Form, FormField } from "@/components/ui/form";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import Button from '../components/button/button'

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
		<div className='h-screen w-full grid grid-rows-6'>
			<div className='row-span-1 text-4xl text-center p-4'>Company Blabber</div>

			<main className="flex flex-col items-center justify-between p-24 row-span-5">
				<div className='w-full grid grid-cols-2 gap-4'>
				{ post.map(datum => (
					<div className='text-center' key={datum.id}>
						<h1 className='text-2xl'>{datum.title}</h1>
						<h2 className='text-xl'>{datum.posted_by}</h2>
						<p className='p-4'>
							{datum.content}
						</p>
					</div>
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