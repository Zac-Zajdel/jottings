import { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import Signin from 'pages/auth/signin'

type Props = {
  children: ReactNode;
};

const Auth = ({ children }: Props) => {
  const { data: session } = useSession()

  if (!session) {
    return <Signin />
  } else {
    return <>{children}</>
  }
}

export default Auth
