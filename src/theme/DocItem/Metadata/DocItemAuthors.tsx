/**
 * Authors component for displaying authors in doc pages
 */
import React from 'react';
import clsx from 'clsx';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import BlogAuthor from '@theme/Blog/Components/Author';
import styles from './DocItemAuthors.module.css';

// Load authors data from JSON
import authorsData from '@site/src/data/authors.json';

// Component responsible for the authors layout
export default function DocItemAuthors({className}) {
  const {frontMatter} = useDoc();
  const authorKeys = (frontMatter as any).authors;
  
  if (!authorKeys || authorKeys.length === 0) {
    return null;
  }

  // Map author keys to author data
  const authors = authorKeys.map((key) => {
    const authorData = authorsData[key];
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

  const authorsCount = authors.length;
  if (authorsCount === 0) {
    return null;
  }

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
          key={idx}>
          <BlogAuthor author={author} />
        </div>
      ))}
    </div>
  );
}
