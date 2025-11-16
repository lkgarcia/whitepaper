"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocItemContent;
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var react_1 = require("react");
var clsx_1 = require("clsx");
var theme_common_1 = require("@docusaurus/theme-common");
var client_1 = require("@docusaurus/plugin-content-docs/client");
var Heading_1 = require("@theme/Heading");
var MDXContent_1 = require("@theme/MDXContent");
var DocItemInfo_1 = require("@theme/DocItem/Metadata/DocItemInfo");
var DocItemAuthors_1 = require("@theme/DocItem/Metadata/DocItemAuthors");
var react_dom_1 = require("react-dom");
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
    var _a = (0, client_1.useDoc)(), metadata = _a.metadata, frontMatter = _a.frontMatter, contentTitle = _a.contentTitle;
    var shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
    if (!shouldRender) {
        return null;
    }
    return metadata.title;
}
// Component to inject metadata after the first H1
function MetadataInjector() {
    var _a = react_1.default.useState(null), container = _a[0], setContainer = _a[1];
    (0, react_1.useEffect)(function () {
        // Check if we're in a browser environment (SSR/SSG compatibility)
        if (typeof document === 'undefined') {
            return;
        }
        // Find the first H1 in the markdown content
        var markdownDiv = document.querySelector('.markdown');
        if (!markdownDiv) {
            setContainer(null);
            return;
        }
        var firstH1 = markdownDiv.querySelector('h1');
        if (!firstH1) {
            setContainer(null);
            return;
        }
        // Check if a container already exists after the H1
        var metadataContainer = firstH1.nextElementSibling;
        if (!metadataContainer || !metadataContainer.classList.contains('doc-metadata-container')) {
            metadataContainer = document.createElement('div');
            metadataContainer.classList.add('doc-metadata-container');
            firstH1.parentNode.insertBefore(metadataContainer, firstH1.nextSibling);
        }
        setContainer(metadataContainer);
        // Cleanup: remove the container on unmount
        return function () {
            if (metadataContainer && metadataContainer.parentNode) {
                metadataContainer.parentNode.removeChild(metadataContainer);
            }
        };
    }, []);
    if (!container) {
        return null;
    }
    return (0, react_dom_1.createPortal)(<>
      <DocItemInfo_1.default />
      <DocItemAuthors_1.default />
    </>, container);
}
function DocItemContent(_a) {
    var children = _a.children;
    var syntheticTitle = useSyntheticTitle();
    var frontMatter = (0, client_1.useDoc)().frontMatter;
    var shouldShowMetadata = !frontMatter.hide_title;
    return (<div className={(0, clsx_1.default)(theme_common_1.ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (<header>
          <Heading_1.default as="h1">{syntheticTitle}</Heading_1.default>
          <DocItemInfo_1.default />
          <DocItemAuthors_1.default />
        </header>)}
      <MDXContent_1.default>{children}</MDXContent_1.default>
      {!syntheticTitle && shouldShowMetadata && <MetadataInjector />}
    </div>);
}
