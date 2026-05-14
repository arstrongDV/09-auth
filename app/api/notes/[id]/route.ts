import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
    const { id } = await params;
    try{
        const { data } = await api(`/notes/${id}`)
         return NextResponse.json(data);
    } catch (error) {
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

export async function DELETE(request: NextRequest, { params }: Props) {
    const { id } = await params;
    try{
        const { data } = await api.delete(`/notes/${id}`)
         return NextResponse.json(data);
    } catch (error) {
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