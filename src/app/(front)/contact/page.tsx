import { Mail, Phone, Clock } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import ContactForm from './contact-form'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">ติดต่อเรา</h1>
        <p className="text-muted-foreground text-lg">
          หากคุณมีคำถามหรือต้องการความช่วยเหลือ กรุณากรอกแบบฟอร์มด้านล่าง
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">contact@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">เบอร์โทรศัพท์</p>
                <p className="text-sm text-muted-foreground">02-xxx-xxxx</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">เวลาทำการ</p>
                <p className="text-sm text-muted-foreground">จันทร์ - ศุกร์: 09:00 - 18:00</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="text-muted-foreground text-sm leading-relaxed">
            เรายินดีรับฟังทุกคำแนะนำและข้อเสนอแนะของคุณ <br />
            ทีมงานของเราจะพยายามตอบกลับให้เร็วที่สุดเท่าที่จะเป็นไปได้
          </div>
        </div>

        <div className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
