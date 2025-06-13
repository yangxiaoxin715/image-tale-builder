
import React, { useState } from 'react';
import { BookOpen, Sparkles, Heart, User } from 'lucide-react';
import { FormData } from '../pages/Index';
import FeatureCard from './FeatureCard';

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-sky-600 mr-2" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
              魔法故事屋
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            输入你的英文故事，几分钟生成专属英文绘本（图+PDF）
          </p>
          <div className="flex items-center justify-center text-sm text-sky-600">
            <Sparkles className="w-4 h-4 mr-1" />
            <span>专注图画绘本，无音频功能</span>
          </div>
        </div>

        {/* 主表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 故事输入区域 */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
              <BookOpen className="w-5 h-5 mr-2 text-sky-600" />
              英文故事内容
            </label>
            <textarea
              value={formData.story}
              onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
              placeholder="Paste your English story here (50-150 words)..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl focus:border-sky-400 focus:outline-none resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${formData.story.length < 50 ? 'text-red-500' : 'text-green-500'}`}>
                {formData.story.length} 字符 (最少50字符)
              </span>
              {errors.story && <span className="text-red-500 text-sm">{errors.story}</span>}
            </div>
          </div>

          {/* 角色定制区域 - 重点突出 */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 shadow-lg border-2 border-purple-200">
            <div className="flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-xl font-bold text-purple-700">主角形象定制</h3>
              <Heart className="w-5 h-5 text-pink-500 ml-2 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">角色姓名 *</label>
                <input
                  type="text"
                  value={formData.character.name}
                  onChange={(e) => updateCharacter('name', e.target.value)}
                  placeholder="如: Emma, Jack, Luna"
                  className="w-full p-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none"
                />
                {errors.characterName && <span className="text-red-500 text-sm">{errors.characterName}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">年龄</label>
                <input
                  type="text"
                  value={formData.character.age}
                  onChange={(e) => updateCharacter('age', e.target.value)}
                  placeholder="如: 5 years old, young, teenage"
                  className="w-full p-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">外貌特征</label>
                <input
                  type="text"
                  value={formData.character.appearance}
                  onChange={(e) => updateCharacter('appearance', e.target.value)}
                  placeholder="如: fluffy white rabbit with pink bow"
                  className="w-full p-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">性格特点</label>
                <input
                  type="text"
                  value={formData.character.personality}
                  onChange={(e) => updateCharacter('personality', e.target.value)}
                  placeholder="如: curious and brave"
                  className="w-full p-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 绘本设置 */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">绘本设置</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">页数选择</label>
                <div className="flex gap-2">
                  {['5', '6', '7', '8'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, pages: num }))}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        formData.pages === num
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {num}页
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">绘画风格</label>
                <select
                  value={formData.style}
                  onChange={(e) => setFormData(prev => ({ ...prev, style: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-sky-400 focus:outline-none"
                >
                  <option value="children">儿童插画</option>
                  <option value="fantasy">梦幻童话风</option>
                  <option value="cartoon">卡通简笔风</option>
                </select>
              </div>
            </div>
          </div>

          {/* 生成按钮 */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-sky-500 to-purple-600 text-white text-lg font-bold rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <Sparkles className="w-6 h-6 mr-2 animate-spin" />
            开始生成我的专属绘本
          </button>
        </form>

        {/* 特色功能展示 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            icon={<User className="w-8 h-8 text-purple-500" />}
            title="完全自定义角色"
            description="从零创建独特主角"
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-sky-500" />}
            title="纯图画绘本"
            description="专注视觉故事体验"
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8 text-pink-500" />}
            title="温暖可爱风格"
            description="适合全年龄段阅读"
          />
        </div>
      </div>
    </div>
  );
};

export default StoryForm;
