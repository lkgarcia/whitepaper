/**
 * Metadata info component for displaying date and reading time in doc pages
 */
import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {usePluralForm} from '@docusaurus/theme-common';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './DocItemInfo.module.css';

interface DocFrontMatter {
  date?: string;
}

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        {readingTime},
      ),
    );
  };
}

function ReadingTime({readingTime}: {readingTime: number}) {
  const readingTimePlural = useReadingTimePlural();
  return <>{readingTimePlural(readingTime)}</>;
}

function DateTime({date, formattedDate}) {
  return <time dateTime={date}>{formattedDate}</time>;
}

function Spacer() {
  return <>{' · '}</>;
}

// Calculate reading time from content
function calculateReadingTime(content: string): number {
  // Average reading speed: 200-250 words per minute
  const wordsPerMinute = 200;
  
  // Remove markdown syntax and count words
  const text = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/[#*_~`]/g, '') // Remove markdown symbols
    .replace(/\s+/g, ' '); // Normalize whitespace
  
  const words = text.trim().split(/\s+/).length;
  return words / wordsPerMinute;
}

export default function DocItemInfo({className}) {
  const {frontMatter, contentTitle} = useDoc();
  const {date} = frontMatter as DocFrontMatter;
  
  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const formatDate = (docDate) => dateTimeFormat.format(new Date(docDate));

  // Calculate reading time from document content
  const [readingTime, setReadingTime] = React.useState<number | undefined>(undefined);
  
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      // Get the markdown content
      const markdownDiv = document.querySelector('.markdown');
      if (markdownDiv) {
        const content = markdownDiv.textContent || '';
        const time = calculateReadingTime(content);
        setReadingTime(time);
      }
    }
  }, [contentTitle]);

  // Don't render if there's no date in frontmatter
  if (!date) {
    return null;
  }

  return (
    <div className={clsx(styles.container, 'margin-vert--md', className)}>
      <DateTime date={date} formattedDate={formatDate(date)} />
      {typeof readingTime !== 'undefined' && readingTime > 0 && (
        <>
          <Spacer />
          <ReadingTime readingTime={readingTime} />
        </>
      )}
    </div>
  );
}
