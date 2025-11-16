"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocItemInfo;
/**
 * Metadata info component for displaying date and reading time in doc pages
 */
var react_1 = require("react");
var clsx_1 = require("clsx");
var internal_1 = require("@docusaurus/theme-common/internal");
var client_1 = require("@docusaurus/plugin-content-docs/client");
var DocItemInfo_module_css_1 = require("./DocItemInfo.module.css");
function DateTime(_a) {
    var date = _a.date, formattedDate = _a.formattedDate;
    return <time dateTime={date}>{formattedDate}</time>;
}
function DocItemInfo(_a) {
    var className = _a.className;
    var frontMatter = (0, client_1.useDoc)().frontMatter;
    var date = frontMatter.date;
    var dateTimeFormat = (0, internal_1.useDateTimeFormat)({
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
    var formatDate = function (docDate) { return dateTimeFormat.format(new Date(docDate)); };
    // Don't render if there's no date in frontmatter
    if (!date) {
        return null;
    }
    return (<div className={(0, clsx_1.default)(DocItemInfo_module_css_1.default.container, 'margin-vert--md', className)}>
      <DateTime date={date} formattedDate={formatDate(date)}/>
    </div>);
}
