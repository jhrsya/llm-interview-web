import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '大模型算法工程师面试题库',
  description: '大模型算法工程师面试题汇总 - 包含Transformer、RLHF、推理优化、RAG等高频面试题',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}
