/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useEffect, useRef} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import DocItemInfo from '@theme/DocItem/Metadata/DocItemInfo';
import DocItemAuthors from '@theme/DocItem/Metadata/DocItemAuthors';
import {createPortal} from 'react-dom';

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

// Component to inject metadata after the first H1
function MetadataInjector() {
  const containerRef = useRef(null);
  const [h1Element, setH1Element] = React.useState(null);
  
  useEffect(() => {
    // Find the first H1 in the markdown content
    const markdownDiv = document.querySelector('.markdown');
    if (markdownDiv) {
      const firstH1 = markdownDiv.querySelector('h1');
      if (firstH1) {
        setH1Element(firstH1);
      }
    }
  }, []);
  
  if (!h1Element) {
    return null;
  }
  
  // Create a container div after the H1 if it doesn't exist
  let metadataContainer = h1Element.nextElementSibling;
  if (!metadataContainer || !metadataContainer.classList.contains('doc-metadata-container')) {
    metadataContainer = document.createElement('div');
    metadataContainer.classList.add('doc-metadata-container');
    h1Element.parentNode.insertBefore(metadataContainer, h1Element.nextSibling);
  }
  
  return createPortal(
    <>
      <DocItemInfo />
      <DocItemAuthors />
    </>,
    metadataContainer
  );
}

export default function DocItemContent({children}) {
  const syntheticTitle = useSyntheticTitle();
  const {frontMatter} = useDoc();
  const shouldShowMetadata = !frontMatter.hide_title;
  
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
          <DocItemInfo />
          <DocItemAuthors />
        </header>
      )}
      <MDXContent>{children}</MDXContent>
      {!syntheticTitle && shouldShowMetadata && <MetadataInjector />}
    </div>
  );
}
