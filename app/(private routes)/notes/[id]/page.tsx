import { fetchNote } from "@/lib/api/clientApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface NoteDetailsProps {
    params: Promise<{id: string}>;
}

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchNote(id);

    return{
        title: note.title,
        description: note.content,
        openGraph: {
            title: note.title,
            description: note.content,
            url: `https://notehub.com/notes/${id}`,
            siteName: 'NoteHub',
            images: [{
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'noteHub-img',
            }],
        }
    }
}

const NoteDetails = async({ params }: NoteDetailsProps) => {
    const queryClient = new QueryClient();
    const { id } = await params;

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNote(id)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
}

export default NoteDetails;