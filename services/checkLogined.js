
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useLoginContext } from '../context/loginstate';



export default function checkLoginedandRouteLogin(trueOrFalse) {
    const router = useRouter()

    const loginContext = useLoginContext();
    useEffect(() => {
        if (!loginContext.loggedIn) router.push('/login');
    })
}

// deprecated
export function checkLoginedandRouteHome(trueOrFalse) {
    const router = useRouter()

    const loginContext = useLoginContext();
    useEffect(() => {
        if (loginContext.loggedIn) router.push('');
    })
}