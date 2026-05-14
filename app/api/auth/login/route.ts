import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { isAxiosError } from "axios";

export async function POST(request: NextRequest,) {
    const body = await request.json();
    try {
        const apiRes = await api.post('/auth/login', body);

        const cookieStore = await cookies()

        const setCookie = apiRes.headers['set-cookie'];
        if(setCookie){
            const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

            for(const cookieStr of cookieArray) {
                const parsed = parse(cookieStr);
                const options = {
                    expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                    path: parsed.Path,
                    maxAge: Number(parsed['Max-Age']),
                };

                if(parsed.accessToken){
                    cookieStore.set('accessToken', parsed.accessToken, options)
                }
                if (parsed.refreshToken) {
                    cookieStore.set('refreshToken', parsed.refreshToken, options);
                }
            }
            return NextResponse.json(apiRes.data, { status: apiRes.status });
        }
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    } catch(error){
        if (isAxiosError(error)) {
            return NextResponse.json(
                { error: error.response?.data.message ?? error.message },
                { status: error.response?.status }
            )
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}