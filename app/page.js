// import { Button } from "@/components/ui/button";
// import { Form, FormField } from "@/components/ui/form";
// import Header from "@/components/header/header";

import { createClient } from "../utils/supabase/server";

export default async function Home() {

	const supabase = createClient()
	const { data, error } = await supabase
	.from('post')
	.select()

	// console.log(data)
	// const { data, error } = await supabase.auth.getUser()
	// console.log('###: ',data, error)

	return (
		<div>
			<div className='text-4xl text-center'>Company Blabber</div>
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				{/* <Header/> */}
				<div className='w-full grid grid-cols-2 gap-4'>
				{ data.map(datum => (
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
		</div>
	);
}