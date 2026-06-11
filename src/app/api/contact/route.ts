import { Resend } from 'resend';
import { contactSchema } from '@/lib/validations/contact';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'ข้อมูลไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    try {
      await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: process.env.CONTACT_RECEIVER_EMAIL || 'admin@example.com',
        subject: `New Contact Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });
    } catch (e) {
      console.error('Resend Error:', e);
      return NextResponse.json(
        { success: false, error: 'ไม่สามารถส่ง email ได้ในขณะนี้' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการประมวลผล' },
      { status: 500 }
    );
  }
}
