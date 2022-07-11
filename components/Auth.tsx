import { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Signin from 'pages/auth/signin'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode;
};

const Auth = ({ children }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push({ pathname: '/auth/signin' }, undefined, { shallow: true })
    } else {
      router.push({ pathname: '/notes' }, undefined, { shallow: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  if (!session) {
    return <Signin />
  } else {
    return <>{children}</>
  }
}

export default Auth
