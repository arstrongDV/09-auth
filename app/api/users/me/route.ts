import { NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { api, ApiError } from '../../api';

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });


    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.message ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    )
  }
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const body = await request.json();
  try {
	  const { data } = await api.patch('/users/me', body, {
	    headers: {
	      Cookie: cookieStore.toString(),
	    },
	  });
	
		return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.message ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    )
  }
}