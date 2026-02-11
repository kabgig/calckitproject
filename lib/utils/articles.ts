import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleMetadata {
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  keywords: string[];
}

export interface Article {
  metadata: ArticleMetadata;
  content: string;
}

/**
 * Auto-discover all category directories under content/articles/
 * and read every .mdx file within them.
 */
function discoverCategories(): string[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  return fs
    .readdirSync(articlesDirectory, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getAllArticles(): ArticleMetadata[] {
  const articles: ArticleMetadata[] = [];
  const categories = discoverCategories();

  for (const category of categories) {
    const categoryDir = path.join(articlesDirectory, category);
    const files = fs.readdirSync(categoryDir);

    for (const filename of files) {
      if (filename.endsWith('.mdx')) {
        const filePath = path.join(categoryDir, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        articles.push(data as ArticleMetadata);
      }
    }
  }

  // Sort by date (newest first)
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | null {
  const categories = discoverCategories();

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
  return getAllArticles().map((article) => article.slug);
}
