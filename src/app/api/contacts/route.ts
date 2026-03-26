import { NextResponse } from 'next/server';
import { getContacts, addContact, Contact } from '@/lib/store';

export async function GET() {
  return NextResponse.json(getContacts());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;
    
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }
    
    const newContact: Contact = {
      id: crypto.randomUUID(),
      name,
      email
    };
    
    addContact(newContact);
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
