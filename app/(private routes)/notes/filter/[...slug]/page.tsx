import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api/serverApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Notes from "./Notes.client";
import { Metadata } from "next";

interface NotesByCategory {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesByCategory): Promise<Metadata> {
    const { slug } = await params;
    const category = slug?.[0] === 'all' ? undefined : slug?.[0];

    return{
        title: `Category: ${category}`,
        description: `Selected category by: ${category}`,
        openGraph: {
            title: "Selected categories",
            description:`Selected category by: ${category}`,
            url: `https://notehub.com/notes/filter/${slug}`,
            siteName: 'NoteHub',
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'noteHub-img',
                },
            ],
        }
    }
}

const NotesByCategory = async ({ params }: NotesByCategory) => {
    const { slug } = await params;
    const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", tag],
        queryFn: () => fetchNotes({
            tag: tag
        }),
    });

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes tag={tag} />  
    </HydrationBoundary> 
};

export default NotesByCategory;