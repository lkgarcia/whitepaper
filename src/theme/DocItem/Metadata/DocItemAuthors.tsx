/**
 * Authors component for displaying authors in doc pages
 */
import React from 'react';
import clsx from 'clsx';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {usePluginData} from '@docusaurus/useGlobalData';
import BlogAuthor from '@theme/Blog/Components/Author';
import styles from './DocItemAuthors.module.css';

// Define the expected shape of frontMatter
interface DocFrontMatter {
  authors?: string[];
}

// Component responsible for the authors layout
export default function DocItemAuthors({className}) {
  const {frontMatter} = useDoc();
  const {authors: authorKeys} = frontMatter as DocFrontMatter;
  
  // Get authors data from plugin
  const {authors: authorsData} = usePluginData('docusaurus-plugin-docs-authors') as {authors: any};
  
  if (!authorKeys || authorKeys.length === 0) {
    return null;
  }

  // Map author keys to author data
  const authors = authorKeys.map((key) => {
    const authorData = authorsData?.[key];
    if (!authorData) {
      return {name: key};
    }
    return {
      name: authorData.name,
      title: authorData.title,
      url: authorData.url,
      imageURL: authorData.image_url,
      email: authorData.email,
    };
  });

  const imageOnly = authors.every(({name}) => !name);
  const singleAuthor = authors.length === 1;

  return (
    <div
      className={clsx(
        'margin-top--md margin-bottom--sm',
        imageOnly ? styles.imageOnlyAuthorRow : 'row',
        className,
      )}>
      {authors.map((author, idx) => (
        <div
          className={clsx(
            !imageOnly && (singleAuthor ? 'col col--12' : 'col col--6'),
            imageOnly ? styles.imageOnlyAuthorCol : styles.authorCol,
          )}
          key={authorKeys[idx]}>
          <BlogAuthor author={author} />
        </div>
      ))}
    </div>
  );
}
