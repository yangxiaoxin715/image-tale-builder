
import React, { useState } from 'react';
import { BookOpen, Sparkles, Heart, User, Star, Wand2, Palette } from 'lucide-react';
import { FormData } from '../pages/Index';

interface StoryFormProps {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
}

const StoryForm: React.FC<StoryFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.story.trim().length < 50) {
      newErrors.story = '故事内容至少需要50个字符';
    }
    
    if (!formData.character.name.trim()) {
      newErrors.characterName = '请输入角色姓名';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateCharacter = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      character: {
        ...prev.character,
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-gradient-to-br from-sky-200 to-purple-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-1/4 -left-20 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-25 animate-pulse"></div>
        
        {/* 飘浮的星星 */}
        <Star className="absolute top-20 left-1/4 w-6 h-6 text-yellow-300 animate-pulse" />
        <Star className="absolute top-40 right-1/3 w-4 h-4 text-pink-300 animate-bounce" />
        <Star className="absolute bottom-40 left-1/3 w-5 h-5 text-purple-300 animate-pulse" />
        <Sparkles className="absolute top-60 right-1/4 w-7 h-7 text-sky-300 animate-spin" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* 标题区域 - 增强设计 */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white rounded-full p-4 shadow-lg mr-4">
                <BookOpen className="w-10 h-10 text-sky-600" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  魔法故事屋
                </h1>
                <div className="flex items-center justify-center mt-2">
                  <Wand2 className="w-5 h-5 text-purple-500 mr-2 animate-bounce" />
                  <span className="text-purple-600 font-medium">AI驱动的个性化绘本生成器</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 mb-4">
              <p className="text-xl text-gray-700 mb-3 font-medium">
                输入你的英文故事，几分钟生成专属英文绘本（图+PDF）
              </p>
              <div className="flex items-center justify-center text-sm">
                <Palette className="w-4 h-4 mr-2 text-sky-600" />
                <span className="text-sky-700 bg-sky-100 px-3 py-1 rounded-full">专注图画绘本，无音频功能</span>
              </div>
            </div>
          </div>

          {/* 主表单 - 增强设计 */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 故事输入区域 - 优化设计 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
              <label className="flex items-center text-xl font-bold text-gray-700 mb-4">
                <div className="bg-gradient-to-r from-sky-500 to-purple-500 p-2 rounded-xl mr-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                英文故事内容
              </label>
              <div className="relative">
                <textarea
                  value={formData.story}
                  onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
                  placeholder="Paste your English story here (50-150 words)..."
                  className="w-full h-36 p-6 border-2 border-gray-200 rounded-2xl focus:border-sky-400 focus:ring-4 focus:ring-sky-100 focus:outline-none resize-none text-lg leading-relaxed transition-all duration-300"
                />
                <div className="absolute bottom-4 right-4">
                  <Sparkles className="w-5 h-5 text-gray-300" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className={`text-sm font-medium ${formData.story.length < 50 ? 'text-red-500' : 'text-green-600'}`}>
                  {formData.story.length} 字符 {formData.story.length >= 50 ? '✓' : '(最少50字符)'}
                </span>
                {errors.story && <span className="text-red-500 text-sm font-medium">{errors.story}</span>}
              </div>
            </div>

            {/* 角色定制区域 - 重点优化 */}
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-3xl p-8 shadow-xl border-2 border-purple-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              {/* 装饰性背景 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 -translate-y-8 translate-x-8"></div>
              
              <div className="flex items-center justify-center mb-6 relative">
                <div className="bg-white rounded-full p-3 shadow-lg mr-3">
                  <User className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-purple-700">主角形象定制</h3>
                <Heart className="w-6 h-6 text-pink-500 ml-3 animate-pulse" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-purple-700 mb-3">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    角色姓名 *
                  </label>
                  <input
                    type="text"
                    value={formData.character.name}
                    onChange={(e) => updateCharacter('name', e.target.value)}
                    placeholder="如: Emma, Jack, Luna"
                    className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 bg-white/80"
                  />
                  {errors.characterName && <span className="text-red-500 text-sm font-medium">{errors.characterName}</span>}
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-purple-700 mb-3">
                    <Star className="w-4 h-4 mr-1 text-blue-500" />
                    年龄
                  </label>
                  <input
                    type="text"
                    value={formData.character.age}
                    onChange={(e) => updateCharacter('age', e.target.value)}
                    placeholder="如: 5 years old, young, teenage"
                    className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 bg-white/80"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-purple-700 mb-3">
                    <Star className="w-4 h-4 mr-1 text-green-500" />
                    外貌特征
                  </label>
                  <input
                    type="text"
                    value={formData.character.appearance}
                    onChange={(e) => updateCharacter('appearance', e.target.value)}
                    placeholder="如: fluffy white rabbit with pink bow"
                    className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 bg-white/80"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-purple-700 mb-3">
                    <Star className="w-4 h-4 mr-1 text-pink-500" />
                    性格特点
                  </label>
                  <input
                    type="text"
                    value={formData.character.personality}
                    onChange={(e) => updateCharacter('personality', e.target.value)}
                    placeholder="如: curious and brave"
                    className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 bg-white/80"
                  />
                </div>
              </div>
            </div>

            {/* 绘本设置 - 优化设计 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
              <h3 className="flex items-center text-xl font-bold text-gray-700 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-xl mr-3">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                绘本设置
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">页数选择</label>
                  <div className="flex gap-3">
                    {['5', '6', '7', '8'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, pages: num }))}
                        className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                          formData.pages === num
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-300'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200'
                        }`}
                      >
                        {num}页
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">绘画风格</label>
                  <select
                    value={formData.style}
                    onChange={(e) => setFormData(prev => ({ ...prev, style: e.target.value }))}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-sky-400 focus:ring-4 focus:ring-sky-100 focus:outline-none transition-all duration-300 bg-white font-medium"
                  >
                    <option value="children">🎨 儿童插画</option>
                    <option value="fantasy">✨ 梦幻童话风</option>
                    <option value="cartoon">🖍️ 卡通简笔风</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 生成按钮 - 增强设计 */}
            <div className="relative">
              <button
                type="submit"
                className="w-full py-6 bg-gradient-to-r from-sky-500 via-purple-600 to-pink-600 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
              >
                {/* 按钮内部光效 */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <Sparkles className="w-7 h-7 mr-3 animate-spin relative z-10" />
                <span className="relative z-10">开始生成我的专属绘本</span>
                <Wand2 className="w-7 h-7 ml-3 animate-bounce relative z-10" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoryForm;
