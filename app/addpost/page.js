'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { getSession, useSession } from "next-auth/react";

export default function AddPost({ user }) {
    // const [postType, setPostType] = useState('')
    // const session = await getServerSession(authOptions)

    const [postText, setPostText] = useState('')

    // const supabase = createClientComponentClient()
    // const [users, setUsers] = useState([])
  
    // const getUsers = async () => {
    //   const { data, error } = await supabase.schema('next_auth').from('users').select()
    //   setUsers(data)
    // }
  
    // useEffect(() => {
    //   getUsers()
    // }, [])

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form onSubmit={() => handleFormSubmit()}>
          <input onChange={(e) => setPostText(e.target.value)} required placeholder='Your Post Text' type='text'></input>
            {/* <select onChange={(e) => setPostType(e.target.value)} value={postType}>
                <option>Text</option>
                <option>Image</option>
            </select>

            { postType === 'Image' ? 
                    <>
                        <label>Your Image</label>
                        <input required type='file' accept='image/png, image/gif, image/jpeg'></input>
                    </> :
                    <>
                        <label>Your Text</label>
                        <input required type='text'></input>
                    </>
            } */}
            <Button type='submit'>Submit</Button>
        </form>
      </main>
    );
  }