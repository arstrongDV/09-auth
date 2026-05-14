import { getServerMe } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css'
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Profile",
  description: "Your own profile in NoteHub.",
  openGraph: {
    title: "Your Profile",
    description: "Your own profile in NoteHub.",
    url: 'https://notehub.vercel.app',
    siteName: 'NoteHub',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'noteHub-img',
    }],

  }
};

const Profile = async() => {
    const user = await getServerMe();

    console.log("useruseruser: ", user);

    return(
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <a href="/profile/edit" className={css.editProfileButton}>
                    Edit Profile
                    </a>
                </div>
                <div className={css.avatarWrapper}>
                <Image
                    src={`${user.avatar}`}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />
                </div>
                <div className={css.profileInfo}>
                <p>
                    Username: {user.username}
                </p>
                <p>
                    Email: {user.email}
                </p>
                </div>
            </div>
        </main>
    )
}

export default Profile;