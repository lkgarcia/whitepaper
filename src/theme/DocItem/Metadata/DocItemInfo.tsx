/**
 * Metadata info component for displaying date and reading time in doc pages
 */
import React from 'react';
import clsx from 'clsx';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './DocItemInfo.module.css';

function DateTime({date, formattedDate}) {
  return <time dateTime={date}>{formattedDate}</time>;
}

export default function DocItemInfo({className}) {
  const {frontMatter} = useDoc();
  const date = (frontMatter as any).date;
  
  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const formatDate = (docDate) => dateTimeFormat.format(new Date(docDate));

  // Don't render if there's no date in frontmatter
  if (!date) {
    return null;
  }

  return (
    <div className={clsx(styles.container, 'margin-vert--md', className)}>
      <DateTime date={date} formattedDate={formatDate(date)} />
    </div>
  );
}
