'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { contactSchema, ContactFormValues } from '@/lib/validations/contact'


export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || 'เกิดข้อผิดพลาด')
        }

        toast.success('ส่งข้อความเรียบร้อยแล้ว')
        form.reset()
        setIsSubmitted(true)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
        toast.error(errorMessage);
      }
    })
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle className="w-12 h-12 text-green-500" />
        <h3 className="text-xl font-semibold">ส่งข้อความเรียบร้อยแล้ว</h3>
        <p className="text-muted-foreground">
          เราจะติดต่อกลับหาคุณโดยเร็วที่สุด
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsSubmitted(false)}
        >
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">ชื่อ</Label>
          <Input 
            placeholder="กรอกชื่อของคุณ" 
            {...form.register('name')} 
          />
          {form.formState.errors.name && (
            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Email</Label>
          <Input 
            type="email" 
            placeholder="example@email.com" 
            {...form.register('email')} 
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">ข้อความ</Label>
          <Textarea 
            rows={5} 
            placeholder="พิมพ์ข้อความที่ต้องการ..." 
            {...form.register('message')} 
          />
          {form.formState.errors.message && (
            <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
          )}
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isPending}
      >
        {isPending ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </Button>
    </form>
  )
}
