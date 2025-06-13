
import React, { useState } from 'react';
import StoryForm from '../components/StoryForm';
import LoadingPage from '../components/LoadingPage';
import ResultPage from '../components/ResultPage';
import ErrorPage from '../components/ErrorPage';

export interface FormData {
  story: string;
  pages: string;
  style: string;
  character: {
    name: string;
    age: string;
    appearance: string;
    personality: string;
  };
}

export interface BookPage {
  text: string;
  image: string;
  characterNote: string;
}

export interface GeneratedBook {
  title: string;
  character: string;
  characterAge: string;
  characterDescription: string;
  pages: BookPage[];
}

type PageState = 'form' | 'loading' | 'result' | 'error';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageState>('form');
  const [formData, setFormData] = useState<FormData>({
    story: '',
    pages: '6',
    style: 'children',
    character: {
      name: '',
      age: '',
      appearance: '',
      personality: ''
    }
  });
  const [generatedBook, setGeneratedBook] = useState<GeneratedBook | null>(null);
  const [error, setError] = useState<string>('');

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setCurrentPage('loading');
    
    // 模拟API调用
    setTimeout(() => {
      // 生成模拟绘本数据
      const mockBook: GeneratedBook = {
        title: "The Magic Adventure",
        character: data.character.name || "Little Hero",
        characterAge: data.character.age || "young",
        characterDescription: data.character.appearance || "brave adventurer",
        pages: Array.from({ length: parseInt(data.pages) }, (_, index) => ({
          text: `Page ${index + 1}: ${data.character.name || "The hero"} continues the magical journey through enchanted lands, discovering new wonders and making friends along the way.`,
          image: `https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop`,
          characterNote: `Character: ${data.character.name} (${data.character.age}) - ${data.character.appearance}`
        }))
      };
      
      setGeneratedBook(mockBook);
      setCurrentPage('result');
    }, 3000);
  };

  const handleRetry = () => {
    setError('');
    setCurrentPage('form');
  };

  const handleRegenerate = () => {
    setCurrentPage('loading');
    setTimeout(() => {
      setCurrentPage('result');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      {currentPage === 'form' && (
        <StoryForm onSubmit={handleFormSubmit} initialData={formData} />
      )}
      
      {currentPage === 'loading' && (
        <LoadingPage expectedPages={parseInt(formData.pages)} />
      )}
      
      {currentPage === 'result' && generatedBook && (
        <ResultPage 
          book={generatedBook} 
          onRegenerate={handleRegenerate}
          onBackToHome={() => setCurrentPage('form')}
        />
      )}
      
      {currentPage === 'error' && (
        <ErrorPage error={error} onRetry={handleRetry} />
      )}
    </div>
  );
};

export default Index;
