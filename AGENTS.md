<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- DB: Standard `npx prisma` commands (schema in `prisma/schema.prisma`)

## Tech Stack
- Framework: Next.js 16 / React 19
- Styling: Tailwind CSS v4
- Auth: `better-auth`
- Database: Prisma with MariaDB adapter
- State: Zustand
- Validation: Zod
- UI: Radix UI / Shadcn

## Architecture
- Source code: `src/`
- App router: `src/app/` (Uses route groups: `(front)`, `(auth)`)
- Logic/Services: `src/services/` (Business logic), `src/lib/` (Utilities/DB clients)
- Components: `src/components/` (UI in `src/components/ui/`)
- Codegen: Prisma client is generated to `generated/prisma/` instead of `node_modules`

## ข้อกำหนดหลัก
- แยก TypeScript Type ทุกอย่าง ออกไปไว้ที่โฟลเดอร์ src/types
- การตั้งชื่อไฟล์ TypeScript (.ts) ให้ตั้งตามตัวอย่างนี้ คือ course-service.ts
- ห้ามใช้คำสั่ง npx prisma db push
