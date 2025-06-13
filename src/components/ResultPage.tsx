
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, User, Eye, Heart } from 'lucide-react';
import { GeneratedBook } from '../pages/Index';

interface ResultPageProps {
  book: GeneratedBook;
  onRegenerate: () => void;
  onBackToHome: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ book, onRegenerate, onBackToHome }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const nextPage = () => {
    setCurrentPageIndex(prev => Math.min(prev + 1, book.pages.length - 1));
  };

  const prevPage = () => {
    setCurrentPageIndex(prev => Math.max(prev - 1, 0));
  };

  const goToPage = (index: number) => {
    setCurrentPageIndex(index);
  };

  const handleDownload = () => {
    // 模拟PDF下载
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${book.title}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* 成功提示 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-green-50 text-green-700 px-6 py-3 rounded-full mb-4">
            <Heart className="w-5 h-5 mr-2" />
            <span className="font-medium">🎉 你的个性化绘本已完成！</span>
          </div>
        </div>

        {/* 个性化标题 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center justify-center mb-2">
                <User className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-700">主角信息</span>
              </div>
              <p className="text-gray-700">
                <strong>{book.character}</strong> ({book.characterAge}) - {book.characterDescription}
              </p>
            </div>
          </div>
        </div>

        {/* 绘本展示区域 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* 当前页面内容 */}
            <div className="lg:flex lg:min-h-[500px]">
              {/* 图片区域 */}
              <div className="lg:w-1/2 bg-gradient-to-br from-sky-50 to-purple-50 p-8 flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <img
                    src={book.pages[currentPageIndex].image}
                    alt={`Page ${currentPageIndex + 1}`}
                    className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
              
              {/* 文字区域 */}
              <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <div className="flex items-center text-sm text-purple-600 mb-3">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>第 {currentPageIndex + 1} 页 / 共 {book.pages.length} 页</span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    {book.pages[currentPageIndex].text}
                  </p>
                  
                  {/* 角色信息卡片 */}
                  <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                    <div className="flex items-center text-xs text-purple-600 mb-1">
                      <Eye className="w-3 h-3 mr-1" />
                      <span>角色定制信息</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {book.pages[currentPageIndex].characterNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 翻页控制 */}
            <div className="bg-gray-50 px-8 py-6">
              <div className="flex items-center justify-between">
                {/* 上一页按钮 */}
                <button
                  onClick={prevPage}
                  disabled={currentPageIndex === 0}
                  className={`flex items-center px-4 py-2 rounded-xl transition-all ${
                    currentPageIndex === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-sky-600 hover:bg-sky-50 hover:scale-105'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  上一页
                </button>

                {/* 页码指示器 */}
                <div className="flex space-x-2">
                  {book.pages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentPageIndex
                          ? 'bg-gradient-to-r from-sky-500 to-purple-600 scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                {/* 下一页按钮 */}
                <button
                  onClick={nextPage}
                  disabled={currentPageIndex === book.pages.length - 1}
                  className={`flex items-center px-4 py-2 rounded-xl transition-all ${
                    currentPageIndex === book.pages.length - 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-sky-600 hover:bg-sky-50 hover:scale-105'
                  }`}
                >
                  下一页
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              下载PDF绘本
            </button>
            
            <button
              onClick={onRegenerate}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              重新生成
            </button>
            
            <button
              onClick={onBackToHome}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-sky-300 hover:scale-105 transition-all duration-300"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
