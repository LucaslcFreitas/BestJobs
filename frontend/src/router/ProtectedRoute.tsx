import { ReactNode } from 'react';
import NotAuthorized from '../pages/NotAuthorized';
import { useSelector } from 'react-redux';
import { useUser } from '../redux/user/sliceUser';

type ProtectedRouteType = {
    typeUser: 'Candidate' | 'Company';
    children: ReactNode;
};

function ProtectedRoute({ typeUser, children }: ProtectedRouteType) {
    const user = useSelector(useUser);

    if (user.token == null || user.type !== typeUser) {
        return (
            <>
                <NotAuthorized />
            </>
        );
    }

    return <>{children}</>;
}

export default ProtectedRoute;
