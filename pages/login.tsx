import { useSession, signIn, signOut } from 'next-auth/react'

const Login = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>Welcome {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }

  // return (
  //   <>
  //     <section className="body-font overflow-hidden">
  //       <div className="px-5 pb-5">
  //         <div className="flex justify-between item-center pb-10">
  //           <h1 className="text-2xl tracking-wide font-light">All notes</h1>
  //           <button
  //             type="submit"
  //             className="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-jot-blue-100 hover:bg-jot-blue-200"
  //           >
  //             New Jot
  //           </button>
  //         </div>
  //       </div>
  //     </section>
  //   </>
  // )
}

export default Login
