import { auth0 } from '@/lib/auth0';
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { isValidSupplyRequest } from '@/lib/utils/dateHelpers';
import { z } from 'zod';

const requestSchema = z.object({
  agentId: z.string(),
  publicationId: z.string(),
  requestedQuantity: z.number().min(0),
  effectiveDate: z.string(), // ISO date string
});

export async function POST(req: Request) {
  try {
    const session = await auth0.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = requestSchema.parse(body);

    // 1. Validate Business Rules (Before 10:30 AM, No Sat/Sun)
    const { isValid, reason } = isValidSupplyRequest(new Date());
    if (!isValid) {
      return NextResponse.json({ error: reason }, { status: 400 });
    }

    // 2. Save Request to Firestore
    const requestData = {
      ...validatedData,
      requestedBy: session.user.sub,
      requestedAt: serverTimestamp(),
      status: 'pending',
    };

    const docRef = await addDoc(collection(db, 'supplyRequests'), requestData);

    // 3. Create Notification for Superadmin
    await addDoc(collection(db, 'notifications'), {
      type: 'supply_request',
      title: 'New Supply Change Request',
      message: `Agent ${validatedData.agentId} requested change for publication ${validatedData.publicationId}`,
      requestId: docRef.id,
      read: false,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ 
      success: true, 
      requestId: docRef.id 
    });

  } catch (error) {
    console.error('Supply request error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
