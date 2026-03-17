'use client'

import { useState } from 'react'
import { Search, BookOpen, Cpu, Brain, Rocket, MessageSquare, Database, Settings, ChevronDown, ChevronRight, Github, Sun, Moon, Sparkles, Zap, Layers, Code, Terminal } from 'lucide-react'

// 面试题数据 - 完整版
const interviewData = [
  {
    category: '基础概念',
    icon: BookOpen,
    color: 'from-blue-500 via-cyan-500 to-teal-500',
    borderColor: 'border-blue-500/30',
    sections: [
      {
        title: 'Attention 机制',
        questions: [
          'Transformer为什么使用多头注意力机制？',
          'Attention和全连接层有什么区别？',
          '介绍一下 Attention？',
          '传统 Attention 存在哪些问题？',
          'Attention 优化方向有哪些？',
          '介绍一下 Multi-head Attention、Grouped-query Attention、FlashAttention？',
          'BERT中的多头注意力机制-为什么需要多头？',
          '为什么 Transformer 需要进行 Multi-head Attention？',
          'Attention 为什么使用 Multi Head ?',
          '为什么 Self-Attention 中需要除以 sqrt(dk)？',
          'Attention为什么要除以根号d？',
          '为什么 Attention 最后采用了 Dot Product 而不是 Addition？',
        ]
      },
      {
        title: 'Transformer 结构',
        questions: [
          'Transformer Encoder/Decoder结构中的掩码Mask介绍？',
          'Transformer里PE为什么不采用concatenation的方式？',
          '讲一下PostNorm 和 PreNorm？这两个有什么优缺点？',
          '为什么 NLP 用 Layernorm 而不是 batchnorm？',
          '为什么 Bert 的三个 Embedding 可以进行相加？',
          '深度学习中，批量归一化有什么好处？',
          'Dropout如何保证训练和预测阶段的一致性？',
        ]
      },
      {
        title: '位置编码',
        questions: [
          'Transformer 中的 Position Embedding 的作用？',
          '为什么现在的LLM都是Decoder only的架构？',
          '为什么现在大模型都用 left padding？',
        ]
      }
    ]
  },
  {
    category: '模型结构',
    icon: Layers,
    color: 'from-purple-500 via-pink-500 to-rose-500',
    borderColor: 'border-purple-500/30',
    sections: [
      {
        title: 'MHA / MQA / GQA',
        questions: [
          '美团面试官问：MHA/MQA/GQA 的区别是什么？',
          '介绍一下 Multi-head Attention？',
        ]
      },
      {
        title: 'FFN & 激活函数',
        questions: [
          'Transformer中前馈层（FFN）的作用是什么？',
          'Transformers 中 FFN 的作用？',
          '介绍下GLU激活函数和SwiGLU激活函数？',
          '为什么Transformer的FFN需要升维再降维？',
          '为什么transformer的FFN需要先升维再降维?',
        ]
      },
      {
        title: 'Normalization',
        questions: [
          'RMSNorm和LayerNorm有什么区别',
          '大模型常用的 Normalization 都有什么？',
          '为什么 transformer 是 LayerNorm？',
        ]
      },
      {
        title: '主流模型',
        questions: [
          'LLaMA1/2/3的异同？',
          '介绍下LLaMa关键技术点？',
          'Qwen2的模型结构，Qwen2相比Qwen1做了哪些改进',
          'embedding模型为何普遍都用encoder-only架构',
        ]
      }
    ]
  },
  {
    category: '训练与优化',
    icon: Brain,
    color: 'from-violet-500 via-purple-500 to-indigo-500',
    borderColor: 'border-violet-500/30',
    sections: [
      {
        title: '预训练 & SFT',
        questions: [
          '大模型SFT不就好了，为什么还要RLHF？',
          'SFT时哪些参数比较重要？',
          '硕士校招生进入大模型领域工作，选预训练还是SFT？',
          '大模型预训练数据如何预处理？',
          '大模型训练如何评估数据集质量',
          '如何提升llama3训练数据质量？',
          '说一下大模型后训练的流程',
          '讲一下预训练数据处理',
          '为什么有了SFT之后还需要RLHF',
          '数据清洗流程',
          '质量过滤用什么模型',
          '数据配比能说下思路吗',
        ]
      },
      {
        title: 'RLHF & DPO',
        questions: [
          'RLHF 训练过程是怎么样的？',
          'PPO和DPO的主要思想是什么，DPO相比PPO的RLHF做了哪些改进',
          '知道DeepSeek的GRPO吗',
          'GRPO比DPO少了哪个模块',
          '如何缓解RL过程中的对齐税',
          '为什么GRPO容易出现reward崩塌？',
          '介绍一下 DPO 损失函数？',
          '为什么需要DPO算法，DPO算法直觉与SFT算法区别？',
          '大模型训练，什么时候需要预训练？什么时候需要sft？什么时候需要 dpo?',
        ]
      },
      {
        title: '训练优化',
        questions: [
          '讲讲DeepSpeed几个阶段，分别分片什么',
          'DP和DDP的区别',
          '最多用过多少张卡',
          '训练过程如何做模型监控',
          '训练一个大模型需要多少显存？',
          '大模型训练为什么用梯度下降，而不是收敛更快的牛顿法？',
          '深度学习的batchsize必须是2的n次方吗？',
          '反向传播的计算量是前向传播计算量的几倍？',
          '共享权重如何求梯度？',
        ]
      }
    ]
  },
  {
    category: '推理与部署',
    icon: Cpu,
    color: 'from-green-500 via-emerald-500 to-cyan-500',
    borderColor: 'border-green-500/30',
    sections: [
      {
        title: 'KV Cache',
        questions: [
          '了解KV cache吗，GQA的思想是什么',
          '为什么LLM推断中缓存KV比缓存Q更有效?',
          'KV Cache 原理是什么？',
          '为什么KV Cache没有Q-Cache？',
          '为什么LLM推理加速有KV Cache而没有Q Cache？',
        ]
      },
      {
        title: '推理优化',
        questions: [
          '讲一下FlashAttention的思想和做法',
          'decoding策略有哪些',
          '大模型的灾难性遗忘问题怎么解决',
          '如何解决大模型推理过程中的延迟问题？',
          '大模型中的响应延迟怎么解决？',
          '大模型提速有哪些比较好的策略？',
          '为什么vllm能够加快大模型推理速度？',
        ]
      },
      {
        title: '量化',
        questions: [
          'BF16量化为int8的过程如何实现',
          '大模型的量化为什么不会失之毫厘谬以千里？',
        ]
      },
      {
        title: '评估',
        questions: [
          '如何评估LLM',
          '前沿LLM有了解哪些',
          '国内LLM有了解哪些',
          'LLM推理能力的天花板现在是什么程度',
          '大模型如何评测以及当前测评的困境',
        ]
      }
    ]
  },
  {
    category: 'RAG',
    icon: Database,
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    borderColor: 'border-orange-500/30',
    sections: [
      {
        title: 'RAG 基础',
        questions: [
          '了解RAG吗，GraphRAG的做法',
          'RAG流程优化策略有哪些',
          '文档分割模块优化策略',
          'advanced-RAG有哪些',
          'RAG 使用外挂知识库主要为了解决什么问题？',
          '如何评价RAG项目效果的好坏？',
        ]
      },
      {
        title: 'RAG 优化',
        questions: [
          'self-rag有哪些insight，结合工作业务场景，设计知识库问答方案？',
          '如何确保检索到的数据是高质量的?',
          '如何针对比较长的文本表格进行检索?',
          '如何优化检索过程，以减少延迟和提高效率？',
        ]
      }
    ]
  },
  {
    category: 'LoRA & PEFT',
    icon: Zap,
    color: 'from-rose-500 via-red-500 to-orange-500',
    borderColor: 'border-rose-500/30',
    sections: [
      {
        title: 'LoRA',
        questions: [
          'LoRA 面试题汇总',
          'QLoRA和LORA有什么区别',
        ]
      },
      {
        title: '其他 PEFT',
        questions: [
          'Prompt tuning、PET、Prefix tuning、P-tuning的原理区别',
          'Zero-shot、One-shot、Multi-shot区别',
        ]
      }
    ]
  },
  {
    category: 'Agent',
    icon: Rocket,
    color: 'from-cyan-500 via-blue-500 to-indigo-500',
    borderColor: 'border-cyan-500/30',
    sections: [
      {
        title: 'Agent 基础',
        questions: [
          'AI Agent 与 Agentic AI 有什么区别',
          '介绍一下 ReAct',
          'Agent Reflection 模型是什么',
          'Agent里的Memory是什么',
          'agent和faq结合尝试过没有 这两个怎么结合啊？',
        ]
      }
    ]
  },
  {
    category: 'MoE',
    icon: Terminal,
    color: 'from-teal-500 via-cyan-500 to-blue-500',
    borderColor: 'border-teal-500/30',
    sections: [
      {
        title: 'MoE',
        questions: [
          '专家混合模型（MoE）面试常考题',
          'LLM 和搜广推的 MoE 区别在哪里',
          'MoE模型的专家个数是如何决定的',
        ]
      }
    ]
  },
  {
    category: '分布式训练',
    icon: Code,
    color: 'from-indigo-500 via-purple-500 to-pink-500',
    borderColor: 'border-indigo-500/30',
    sections: [
      {
        title: '分布式',
        questions: [
          '分布式训练常用的通信后端都有什么？应该怎么选？',
          '详细说说Deepspeed的机制？',
          '大模型训练框架DeepSpeed中ZeRO-0、ZeRO-1、ZeRO-2、ZeRO-3的选择',
        ]
      }
    ]
  },
  {
    category: '模型问题',
    icon: Sparkles,
    color: 'from-pink-500 via-rose-500 to-red-500',
    borderColor: 'border-pink-500/30',
    sections: [
      {
        title: '幻觉 & 复读机',
        questions: [
          '大模型幻觉是什么，如何才能缓解这个问题？',
          '大模型的幻觉问题、复读机问题是什么？',
        ]
      },
      {
        title: '采样策略',
        questions: [
          '大模型推理的时候 top k 和 top p 同时设置的时候怎么采样？',
        ]
      }
    ]
  }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [darkMode, setDarkMode] = useState(false)

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
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
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-gray-950' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      {/* Hero Section */}
      <header className={`relative overflow-hidden transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800' : 'gradient-bg'}`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        {/* 浮动动画元素 */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-2xl">
                <span className="text-4xl">🤖</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn drop-shadow-lg">
              大模型算法工程师
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn stagger-1 font-medium">
              面试题库 · {totalQuestions} 道高频面试题
            </p>
            
            {/* 搜索框 */}
            <div className="max-w-2xl mx-auto relative animate-fadeIn stagger-2 group">
              <div className="absolute inset-0 bg-white/25 rounded-2xl blur-md group-hover:bg-white/30 transition-all"></div>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70 w-6 h-6" />
                <input
                  type="text"
                  placeholder="搜索面试题..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 transition-all shadow-2xl"
                />
              </div>
            </div>

            {/* 统计卡片 */}
            <div className="flex justify-center gap-6 mt-10 animate-fadeIn stagger-3">
              {[
                { label: '分类', value: interviewData.length, icon: '📚' },
                { label: '模块', value: interviewData.reduce((a, c) => a + c.sections.length, 0), icon: '📖' },
                { label: '题目', value: totalQuestions, icon: '💼' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/15 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20 shadow-xl hover:bg-white/20 transition-all hover:scale-105 cursor-pointer">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.icon} {stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 波浪分隔符 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill={darkMode ? '#0f172a' : '#f8fafc'}/>
          </svg>
        </div>
        
        {/* 深色模式切换按钮 */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all hover:scale-110 shadow-lg"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* 内容区域 */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {searchQuery && (
          <div className="mb-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              找到 {filteredData.reduce((a, c) => a + c.sections.reduce((s, sec) => s + sec.questions.length, 0), 0)} 道相关题目
            </p>
          </div>
        )}

        <div className="grid gap-6">
          {filteredData.map((category, idx) => {
            const Icon = category.icon
            return (
              <div 
                key={category.category}
                className={`group rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  darkMode 
                    ? 'bg-gray-900/80 border border-gray-800 hover:border-gray-700' 
                    : 'bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* 分类标题 */}
                <div className={`px-8 py-5 bg-gradient-to-r ${category.color} cursor-pointer transition-all hover:brightness-110`}
                     onClick={() => toggleSection(category.category)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">{category.category}</h2>
                      <span className="text-white/80 text-sm bg-white/20 px-3 py-1 rounded-full">
                        {category.sections.reduce((a, s) => a + s.questions.length, 0)} 题
                      </span>
                    </div>
                    {expandedSections[category.category] ? 
                      <ChevronDown className="w-6 h-6 text-white/80" /> : 
                      <ChevronRight className="w-6 h-6 text-white/80" />
                    }
                  </div>
                </div>

                {/* 题目列表 */}
                {(!expandedSections[category.category] || !searchQuery) && (
                  <div className="p-6">
                    {category.sections.map((section, secIdx) => (
                      <div key={section.title} className="mb-6 last:mb-0">
                        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-3 ${
                          darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-sm font-bold`}>
                            {secIdx + 1}
                          </span>
                          {section.title}
                        </h3>
                        <div className="grid gap-3">
                          {section.questions.map((question, qIdx) => (
                            <div 
                              key={qIdx} 
                              className={`px-5 py-4 rounded-xl border transition-all cursor-pointer hover:scale-[1.02] ${
                                darkMode
                                  ? 'bg-gray-800/50 border-gray-700 text-gray-200 hover:bg-gray-700/50 hover:border-gray-600'
                                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white hover:border-blue-300 hover:shadow-md'
                              }`}
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
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">没有找到相关题目</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-500 hover:underline"
            >
              清除搜索
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`py-12 mt-16 transition-colors ${
        darkMode ? 'bg-gray-900' : 'bg-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a 
              href="https://github.com/jhrsya/llm-interview-web" 
              target="_blank"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://github.com/jhrsya/llm-interview-notes" 
              target="_blank"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>面试题库</span>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            大模型算法工程师面试题库 · 整理自互联网
          </p>
        </div>
      </footer>
    </div>
  )
}
