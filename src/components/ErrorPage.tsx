
import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

interface ErrorPageProps {
  error: string;
  onRetry: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        {/* 错误图标 */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* 错误标题 */}
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          哎呀，出了点小问题
        </h2>
        
        {/* 错误描述 */}
        <div className="bg-red-50 rounded-2xl p-4 border border-red-200 mb-6">
          <p className="text-red-700 text-sm">
            {error || "生成绘本时遇到了一些技术问题，请稍后重试。"}
          </p>
        </div>

        {/* 温馨提示 */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-purple-200 mb-6">
          <div className="flex items-center justify-center mb-2">
            <Heart className="w-4 h-4 text-pink-500 mr-2" />
            <span className="text-sm font-medium text-purple-700">温馨提示</span>
          </div>
          <p className="text-gray-600 text-sm">
            请检查网络连接，或者稍后再试。如果问题持续存在，请联系我们的技术支持。
          </p>
        </div>

        {/* 重试按钮 */}
        <button
          onClick={onRetry}
          className="w-full py-4 bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-4"
        >
          重新尝试
        </button>

        {/* 返回首页链接 */}
        <p className="text-sm text-gray-500">
          或者{' '}
          <button
            onClick={onRetry}
            className="text-sky-600 hover:text-sky-700 underline font-medium"
          >
            返回首页
          </button>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
