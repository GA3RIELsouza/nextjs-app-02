import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = 'okBPnoxB4ZmXov4mEEtZvV'; // Sua chave da Brapi

    // Endpoint correto da Brapi para o índice ^BVSP
    const response = await fetch(
      `https://brapi.dev/api/quote/^BVSP?token=${apiKey}`,
      {
        next: {
          revalidate: 600, // Cache de 10 minutos
        },
      }
    );

    if (!response.ok) {
      return new NextResponse(
        `Erro ao buscar dados da API Brapi: ${response.statusText}`,
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('[API_IBOVESPA_ERROR]', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}