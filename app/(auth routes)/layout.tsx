'use client'

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";


interface Props {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: Props){
    const [loading, isLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        router.refresh();

        startTransition(() => {
            isLoading(false)
        })
    }, [router])

    return <>{loading ? <div>Loading...</div> : children}</>;
}