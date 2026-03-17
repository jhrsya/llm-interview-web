'use client'

import { useState } from 'react'
import { Search, BookOpen, Cpu, Brain, Rocket, MessageSquare, Database, Settings, ChevronDown, ChevronRight, Github, Star } from 'lucide-react'

// 面试题数据
const interviewData = [
  {
    category: '基础八股',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    sections: [
      {
        title: 'Transformer & LLM基础',
        questions: [
          'Transformer和LLaMA的LN有什么区别',
          '手写RMSNorm',
          'FFN有什么不同，写Relu和SwiGLU',
          'BERT的预训练任务、embedding',
          '讲讲位置编码',
          'Encoder-Decoder、Encoder、Decoder区别',
          '讲一下文本输入大模型到输出的过程',
          '大模型结构有哪些变化'
        ]
      },
      {
        title: '位置编码',
        questions: [
          '讲一下RoPE吧，目前常用的位置编码还有哪些，RoPE有什么优点',
          '如何进一步外推',
          '为什么现在Decoder-only成为大模型的主流架构',
          'Qwen是怎么做长度外推的'
        ]
      },
      {
        title: '模型结构',
        questions: [
          'Qwen2的模型结构，Qwen2相比Qwen1做了哪些改进',
          '说一下LLaMA的结构吧，它在结构和训练上都做了哪些贡献',
          '主流LLM模型结构设计有什么特点',
          'DeepSeek的MLA注意力是怎么做的？它可以直接用RoPE吗？',
          'MLA是怎么对KV Cache做优化的'
        ]
      }
    ]
  },
  {
    category: '训练与优化',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    sections: [
      {
        title: '预训练 & SFT',
        questions: [
          '说一下大模型后训练的流程',
          '讲一下预训练数据处理',
          '为什么有了SFT之后还需要RLHF',
          '数据清洗流程',
          '质量过滤用什么模型',
          '数据配比能说下思路吗'
        ]
      },
      {
        title: 'RLHF & DPO',
        questions: [
          'PPO和DPO的主要思想是什么，DPO相比PPO的RLHF做了哪些改进',
          '知道DeepSeek的GRPO吗',
          'GRPO比DPO少了哪个模块',
          '如何缓解RL过程中的对齐税'
        ]
      },
      {
        title: '训练优化',
        questions: [
          '讲讲DeepSpeed几个阶段，分别分片什么',
          'DP和DDP的区别',
          '最多用过多少张卡',
          '训练过程如何做模型监控'
        ]
      }
    ]
  },
  {
    category: '推理与部署',
    icon: Cpu,
    color: 'from-green-500 to-emerald-500',
    sections: [
      {
        title: '推理优化',
        questions: [
          '了解KV cache吗，GQA的思想是什么',
          '讲一下FlashAttention的思想和做法',
          'decoding策略有哪些',
          '大模型的灾难性遗忘问题怎么解决'
        ]
      },
      {
        title: '评估',
        questions: [
          '如何评估LLM',
          '前沿LLM有了解哪些',
          '国内LLM有了解哪些',
          'LLM推理能力的天花板现在是什么程度'
        ]
      }
    ]
  },
  {
    category: 'RAG相关',
    icon: Database,
    color: 'from-orange-500 to-amber-500',
    sections: [
      {
        title: 'RAG',
        questions: [
          '了解RAG吗，GraphRAG的做法',
          'RAG流程优化策略有哪些',
          '文档分割模块优化策略',
          'advanced-RAG有哪些'
        ]
      }
    ]
  },
  {
    category: 'LoRA & PEFT',
    icon: Settings,
    color: 'from-rose-500 to-red-500',
    sections: [
      {
        title: 'LoRA',
        questions: [
          'LoRA 面试题汇总',
          'QLoRA和LORA有什么区别'
        ]
      },
      {
        title: '其他 PEFT',
        questions: [
          'Prompt tuning、PET、Prefix tuning、P-tuning的原理区别',
          'Zero-shot、One-shot、Multi-shot区别'
        ]
      }
    ]
  },
  {
    category: 'Agent',
    icon: Rocket,
    color: 'from-violet-500 to-purple-500',
    sections: [
      {
        title: 'Agent',
        questions: [
          'AI Agent 与 Agentic AI 有什么区别',
          '介绍一下 ReAct',
          'Agent Reflection 模型是什么',
          'Agent里的Memory是什么'
        ]
      }
    ]
  },
  {
    category: 'MoE',
    icon: MessageSquare,
    color: 'from-teal-500 to-cyan-500',
    sections: [
      {
        title: 'MoE',
        questions: [
          '专家混合模型（MoE）面试常考题',
          'LLM 和搜广推的 MoE 区别在哪里',
          'MoE模型的专家个数是如何决定的'
        ]
      }
    ]
  }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const filteredData = interviewData.map(cat => ({
    ...cat,
    sections: cat.sections.map(sec => ({
      ...sec,
      questions: sec.questions.filter(q => 
        q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.category.includes(searchQuery) ||
        sec.title.includes(searchQuery)
      )
    })).filter(sec => sec.questions.length > 0)
  })).filter(cat => cat.sections.length > 0 && cat.sections.some(sec => sec.questions.length > 0))

  const totalQuestions = interviewData.reduce((acc, cat) => 
    acc + cat.sections.reduce((a, sec) => a + sec.questions.length, 0), 0
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeIn">
              🤖 大模型算法工程师
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-fadeIn stagger-1">
              面试题库 · {totalQuestions} 道高频面试题
            </p>
            
            {/* 搜索框 */}
            <div className="max-w-2xl mx-auto relative animate-fadeIn stagger-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索面试题..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 shadow-2xl text-lg focus:outline-none search-input"
              />
            </div>

            {/* 统计 */}
            <div className="flex justify-center gap-8 mt-8 animate-fadeIn stagger-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{interviewData.length}</div>
                <div className="text-white/70 text-sm">分类</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{interviewData.reduce((a, c) => a + c.sections.length, 0)}</div>
                <div className="text-white/70 text-sm">模块</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{totalQuestions}</div>
                <div className="text-white/70 text-sm">题目</div>
              </div>
            </div>
          </div>
        </div>

        {/* 波浪分隔符 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </header>

      {/* 内容区域 */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {searchQuery && (
          <div className="mb-8">
            <p className="text-gray-500">
              找到 {filteredData.reduce((a, c) => a + c.sections.reduce((s, sec) => s + sec.questions.length, 0), 0)} 道相关题目
            </p>
          </div>
        )}

        <div className="space-y-8">
          {filteredData.map((category, idx) => {
            const Icon = category.icon
            return (
              <div 
                key={category.category}
                className="category-card glass-card rounded-2xl overflow-hidden shadow-lg"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* 分类标题 */}
                <div className={`px-6 py-4 bg-gradient-to-r ${category.color} cursor-pointer`}
                     onClick={() => toggleSection(category.category)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-white" />
                      <h2 className="text-xl font-bold text-white">{category.category}</h2>
                      <span className="text-white/80 text-sm">
                        {category.sections.reduce((a, s) => a + s.questions.length, 0)} 题
                      </span>
                    </div>
                    {expandedSections[category.category] ? 
                      <ChevronDown className="w-5 h-5 text-white" /> : 
                      <ChevronRight className="w-5 h-5 text-white" />
                    }
                  </div>
                </div>

                {/* 题目列表 */}
                {(!expandedSections[category.category] || !searchQuery) && (
                  <div className="p-6">
                    {category.sections.map((section, secIdx) => (
                      <div key={section.title} className="mb-6 last:mb-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                            {secIdx + 1}
                          </span>
                          {section.title}
                        </h3>
                        <div className="grid gap-2">
                          {section.questions.map((question, qIdx) => (
                            <div 
                              key={qIdx} 
                              className="question-item px-4 py-3 rounded-lg border border-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer"
                            >
                              {question}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 空状态 */}
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">没有找到相关题目</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-cyan-600 hover:underline"
            >
              清除搜索
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <a 
              href="https://github.com/jhrsya/llm-interview-notes" 
              target="_blank"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
          <p className="text-sm">
            大模型算法工程师面试题库 · 整理自互联网
          </p>
        </div>
      </footer>
    </div>
  )
}
