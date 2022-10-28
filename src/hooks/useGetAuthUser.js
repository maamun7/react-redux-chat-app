import { useSelector } from 'react-redux';

export default function useGetAuthUser() {
    const { user } = useSelector((state) => state.auth) || {};

    return user;
}
