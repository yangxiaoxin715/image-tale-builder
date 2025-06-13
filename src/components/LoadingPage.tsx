
import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface LoadingPageProps {
  expectedPages: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ expectedPages }) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    "我们正在为你生成绘本，每页图片约10秒，请耐心等待～",
    "你也可以一边喝口水、伸伸懒腰😊",
    "好的故事值得等待，马上就完成了！",
    "正在为你的角色设计完美的形象..."
  ];

  useEffect(() => {
    const duration = 3000; // 3秒完成
    const interval = 100; // 每100ms更新一次
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    // 切换提示文字
    const tipTimer = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        {/* 动画图标 */}
        <div className="mb-8">
          <BookOpen className="w-16 h-16 text-sky-500 mx-auto animate-bounce" />
        </div>

        {/* 标题 */}
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          正在生成你的专属绘本...
        </h2>
        
        {/* 进度条 */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* 进度百分比 */}
        <div className="text-lg font-semibold text-purple-600 mb-4">
          {Math.round(progress)}%
        </div>

        {/* 页数信息 */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
            <span>预计生成 {expectedPages} 页绘本</span>
          </div>
        </div>

        {/* 动态提示 */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-purple-200">
          <p className="text-gray-600 text-sm leading-relaxed animate-pulse">
            {tips[currentTip]}
          </p>
        </div>

        {/* 装饰性sparkles */}
        <div className="mt-6 flex justify-center space-x-4">
          <Sparkles className="w-6 h-6 text-pink-400 animate-spin" />
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <Sparkles className="w-6 h-6 text-sky-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
