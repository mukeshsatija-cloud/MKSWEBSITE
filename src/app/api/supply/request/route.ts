import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { adminDb } from '@/lib/firebase/admin';
import { isValidSupplyRequest } from '@/lib/utils/dateHelpers';
import { z } from 'zform'; // Assume zform/zod for validation, or manual

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { targetDate, newQuantity, publicationId } = body;

    if (!targetDate || typeof newQuantity !== 'number' || !publicationId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Server-side time check using local clock (GCP servers run in UTC, 
    // but dateHelpers can be extended to use date-fns-tz for the exact Indian timezone if needed)
    // For this prototype, isValidSupplyRequest handles general JS Date logic.
    if (!isValidSupplyRequest(targetDate)) {
      return NextResponse.json({ 
        error: 'Invalid request: Cannot change supply on weekends or past 10:30 AM for the next day.' 
      }, { status: 400 });
    }

    const requestRef = adminDb.collection('requests').doc();
    await requestRef.set({
      id: requestRef.id,
      type: 'supply_change',
      status: 'pending',
      requestedBy: userId,
      targetAgent: userId, // Assuming hawker is requesting for themselves
      details: {
        date: targetDate,
        publicationId,
        newQuantity,
      },
      createdAt: Date.now(),
    });

    // Automatically trigger notification for superadmin
    const notifRef = adminDb.collection('notifications').doc();
    await notifRef.set({
      id: notifRef.id,
      message: `Hawker ${session.user.name || userId} requested a supply change for ${targetDate}`,
      readStatus: false,
      createdAt: Date.now(),
      targetedForSuperadmin: true,
    });

    return NextResponse.json({ success: true, requestId: requestRef.id });

  } catch (error) {
    console.error('Failed to submit request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
