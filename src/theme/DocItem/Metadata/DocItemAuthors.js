"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocItemAuthors;
/**
 * Authors component for displaying authors in doc pages
 */
var react_1 = require("react");
var clsx_1 = require("clsx");
var client_1 = require("@docusaurus/plugin-content-docs/client");
var Author_1 = require("@theme/Blog/Components/Author");
var DocItemAuthors_module_css_1 = require("./DocItemAuthors.module.css");
// Load authors data from docs/authors.yml
// @ts-ignore
var authors_yml_1 = require("@site/docs/authors.yml");
// Component responsible for the authors layout
function DocItemAuthors(_a) {
    var className = _a.className;
    var frontMatter = (0, client_1.useDoc)().frontMatter;
    var authorKeys = frontMatter.authors;
    if (!authorKeys || authorKeys.length === 0) {
        return null;
    }
    // Map author keys to author data
    var authors = authorKeys.map(function (key) {
        var authorData = authors_yml_1.default[key];
        if (!authorData) {
            return { name: key };
        }
        return {
            name: authorData.name,
            title: authorData.title,
            url: authorData.url,
            imageURL: authorData.image_url,
            email: authorData.email,
        };
    });
    var imageOnly = authors.every(function (_a) {
        var name = _a.name;
        return !name;
    });
    var singleAuthor = authors.length === 1;
    return (<div className={(0, clsx_1.default)('margin-top--md margin-bottom--sm', imageOnly ? DocItemAuthors_module_css_1.default.imageOnlyAuthorRow : 'row', className)}>
      {authors.map(function (author, idx) { return (<div className={(0, clsx_1.default)(!imageOnly && (singleAuthor ? 'col col--12' : 'col col--6'), imageOnly ? DocItemAuthors_module_css_1.default.imageOnlyAuthorCol : DocItemAuthors_module_css_1.default.authorCol)} key={authorKeys[idx]}>
          <Author_1.default author={author}/>
        </div>); })}
    </div>);
}
