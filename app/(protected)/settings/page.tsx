import { auth, signOut } from '@/auth'
import React from 'react'
import { Button } from '@/components/ui/button'



const Settingspage = async () => {
    const session = await auth()
    return (
        <div>session: {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <Button type='submit'>SignOut</Button>
            </form>
        </div>
    )
}

export default Settingspage