import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { format } = await req.json();

    if (!format) {
      return NextResponse.json({ error: "No format provided" }, { status: 400 });
    }

    await new Promise(resolve => setTimeout(resolve, 2500));

    return NextResponse.json({
      success: true,
      downloadUrl: `/reports/mock-report.${format}`,
      message: `Report generated successfully in ${format} format.`
    });
  } catch (error) {
    return NextResponse.json({ error: "Report generation failed" }, { status: 500 });
  }
}
