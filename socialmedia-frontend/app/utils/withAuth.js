import { useRouter } from 'next/navigation';
import { useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { userId } = useContext(UserContext);

    useEffect(() => {
      if (!userId) {
        router.push('/routes/login');
      }
    }, [userId, router]);

    return userId ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;