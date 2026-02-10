import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleMetadata {
  title: string;
  description: string;
  slug: string;
  category: 'mortgage' | 'apy';
  date: string;
  keywords: string[];
}

export interface Article {
  metadata: ArticleMetadata;
  content: string;
}

export function getAllArticles(): ArticleMetadata[] {
  const articles: ArticleMetadata[] = [];
  
  // Read mortgage articles
  const mortgageDir = path.join(articlesDirectory, 'mortgage');
  const mortgageFiles = fs.readdirSync(mortgageDir);
  
  for (const filename of mortgageFiles) {
    if (filename.endsWith('.mdx')) {
      const filePath = path.join(mortgageDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      articles.push(data as ArticleMetadata);
    }
  }
  
  // Read APY articles
  const apyDir = path.join(articlesDirectory, 'apy');
  const apyFiles = fs.readdirSync(apyDir);
  
  for (const filename of apyFiles) {
    if (filename.endsWith('.mdx')) {
      const filePath = path.join(apyDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      articles.push(data as ArticleMetadata);
    }
  }
  
  // Sort by date (newest first)
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | null {
  const categories = ['mortgage', 'apy'];
  
  for (const category of categories) {
    const categoryDir = path.join(articlesDirectory, category);
    const files = fs.readdirSync(categoryDir);
    
    for (const filename of files) {
      if (filename.endsWith('.mdx')) {
        const filePath = path.join(categoryDir, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        if (data.slug === slug) {
          return {
            metadata: data as ArticleMetadata,
            content,
          };
        }
      }
    }
  }
  
  return null;
}

export function getAllSlugs(): string[] {
  return getAllArticles().map(article => article.slug);
}
