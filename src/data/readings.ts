// src/data/readings.ts

export interface ReadingItem {
    id: string;
    title: string;
    url: string;
    source: string; // 比如 "GitHub", "个人博客", "arXiv"
    comment: string; // 你的简短评价或核心 takeaway
    addedAt: Date;
    startedAt?: Date; // 开始阅读的时间
    finishedAt?: Date; // 读完的时间
    tags: string[];
    status: 'reading' | 'finished' | 'pending';
}
  
export const mockReadings: ReadingItem[] = [
    {
      id: '2026-03-001',
      title: '用開源專案建立職涯：從 Ruby 使用者到維護者的經驗分享',
      url: 'https://st0012.dev/zh-tw/building-a-career-with-open-source/',
      source: '个人博客',
      comment: '希望自己有一天也可以分享这样的经验吧',
      addedAt: new Date('2026-03-29T10:00:00+08:00'),
      startedAt: new Date('2026-03-29T23:00:00+08:00'),
      finishedAt: new Date('2026-03-29T23:05:00+08:00'),
      tags: ['open source', 'career'],
      status: 'finished'
    },
    {
        id: '2026-03-002',
        title: '图解分布式系统原理',
        url: 'https://www.codedump.info/dist-system-cn/',
        source: '专栏文章',
        comment: '感觉分布式系统是黑魔法',
        addedAt: new Date('2026-03-25T09:00:00+08:00'),
        startedAt: new Date('2026-03-27T10:30:00+08:00'),
        tags: ['architecture', 'distributed system'],
        status: 'reading'
    },
    {
        id: '2026-03-003',
        title: 'Auto Dream：Claude新模型代号卡皮巴拉是为了做梦？',
        url: 'https://mp.weixin.qq.com/s/NKNa4qXu2CgHXuFP8I6Dsw',
        source: '微信公众号',
        comment: '直觉上感觉就是个 consolidator',
        addedAt: new Date('2026-03-29T22:00:00+08:00'),
        tags: ['architecture', 'agent'],
        status: 'pending'
    },
    {
        id: '2026-03-004',
        title: 'memU 拆解：当 Agent 的记忆不再是循环里的一行代码',
        url: 'https://mp.weixin.qq.com/s/vxeEmgAqwiR4F0whE5kwxg',
        source: '微信公众号',
        comment: 'memU 的做法也许值得借鉴',
        addedAt: new Date('2026-03-29T22:00:00+08:00'),
        tags: ['architecture', 'agent'],
        status: 'pending'
    }
    // ... 添加更多阅读记录
];