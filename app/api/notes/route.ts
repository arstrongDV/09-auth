import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../api";
import { isAxiosError } from "axios";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const cookieStore = await cookies();

    const tag = searchParams.get('tag');
    const page = searchParams.get('page');
    const search = searchParams.get('search');

    try {
        const { data } = await api('/notes', {
            params: { tag, page, search },
            headers: { Cookie: cookieStore.toString() },
        });
        return NextResponse.json(data);
    } catch(error){
        if (isAxiosError(error)) {
            return NextResponse.json(
                { error: error.response?.data.message ?? error.message },
                { status: error.response?.status }
            )
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        // return NextResponse.json(
        //     {
        //         error: (error as ApiError).response?.data.message ?? (error as ApiError).message
        //     },
        //     {
        //         status: (error as ApiError).status
        //     }
        // )
    }
}

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    try {
        const body = await request.json();
        const { data } = await api.post('/notes', body, {
            headers: { Cookie: cookieStore.toString() },
        });
        return NextResponse.json(data);
    } catch(error){
        // return NextResponse.json(
        //     {
        //         error: (error as ApiError).response?.data.message ?? (error as ApiError).message
        //     },
        //     {
        //         status: (error as ApiError).status
        //     }
        // )
        if (isAxiosError(error)) {
            return NextResponse.json(
                { error: error.response?.data.message ?? error.message },
                { status: error.response?.status }
            )
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}