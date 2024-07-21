import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AddPost() {
	const supabase = createClient()
	const { data: user, errorGetUser } = await supabase.auth.getUser()
    let username = ''
    if(!errorGetUser) {
        username = user.user.user_metadata.preferred_username
    } else {
        redirect('/login')
    }
    // const [postType, setPostType] = useState('')
    // const session = await getServerSession(authOptions)

    // const supabase = createClientComponentClient()
    // const [users, setUsers] = useState([])
  
    // const getUsers = async () => {
    //   const { data, error } = await supabase.schema('next_auth').from('users').select()
    //   setUsers(data)
    // }
  
    // useEffect(() => {
    //   getUsers()
    // }, [])

    async function addPost() {
        'use server'

    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form action={addPost}>
          <input required placeholder='Your Post Text' type='text'/>
            <button type='submit'>Submit</button>
        </form>
      </main>
    );
  }