import { NextRequest, NextResponse } from 'next/server';
import { AnbelCore } from '@/core/AnbelCore';

export async function POST(request: NextRequest) {
  try {
    const { lotteryType, drawDate } = await request.json();
    
    if (!lotteryType) {
      return NextResponse.json(
        { error: 'Lottery type is required' },
        { status: 400 }
      );
    }
    
    const anbel = AnbelCore.getInstance();
    const prediction = await anbel.generatePredictions(lotteryType);
    
    return NextResponse.json({
      success: true,
      prediction,
      generatedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error generating prediction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
