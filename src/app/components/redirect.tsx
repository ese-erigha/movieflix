'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { generateUid } from '../common/helper';
import LoadingSpinner from './loading';

export default function Redirect() {
    const router = useRouter();
    router.push(`/user/${generateUid()}/1`);

    useEffect(() => {

        router.push(`/user/${generateUid()}/1`);
    }, [router])

    return <LoadingSpinner/>
}
