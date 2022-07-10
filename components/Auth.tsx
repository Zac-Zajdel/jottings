import { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import Login from 'pages/login'

type Props = {
  children: ReactNode;
};

const Auth = ({ children }: Props) => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <>
        <Login />
      </>
    )
  } else {
    return <>{children}</>
  }
}

export default Auth
