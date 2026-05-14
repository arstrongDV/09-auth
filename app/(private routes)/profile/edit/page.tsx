'use client'

import React, { useEffect, useState } from 'react';
import css from './EditProfilePage.module.css'
import Image from 'next/image';
import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

const ProfileEdit = () => {
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    console.log("useruseruser: ", user);
    const [username, setUsername] = useState(user?.username ?? '');
    const router = useRouter();

    useEffect(() => {
        if (user?.username) setUsername(user.username);
    }, [user?.username]);

    const handleSaveUser = async (formData: FormData) => {
        const formValue = Object.fromEntries(formData);

        const res = await updateMe({
            username: formValue.username as string
        })

        if(res) {
            user && setUser({
                username: username,
                email: user.email,
                avatar: user.avatar 
            })
            router.push('/profile')
        };
    };

    if(!user) return <p>Loading...</p>

    return(
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={`${user?.avatar}`}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} action={handleSaveUser}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input 
                            id="username"
                            type="text"
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={css.input}
                        />
                    </div>

                    <p>Email: {user.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default ProfileEdit;