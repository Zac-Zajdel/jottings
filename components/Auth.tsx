import { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Signin from 'pages/auth/signin'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode;
};

const Auth = ({ children }: Props) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push({ pathname: '/jots' }, undefined, { shallow: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  if (!session) {
    return <Signin />
  } else {
    return <>{children}</>
  }
}

export default Auth
