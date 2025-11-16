const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function docsAuthorsPlugin(context, options) {
  return {
    name: 'docusaurus-plugin-docs-authors',
    
    async contentLoaded({actions}) {
      const {setGlobalData} = actions;
      
      // Load authors.yml from docs directory
      const authorsPath = path.join(context.siteDir, 'docs', 'authors.yml');
      
      if (fs.existsSync(authorsPath)) {
        const authorsContent = fs.readFileSync(authorsPath, 'utf8');
        const authors = yaml.load(authorsContent);
        
        // Make authors data available globally
        setGlobalData({authors});
      }
    },
    
    async loadContent() {
      // Load authors data during build
      const authorsPath = path.join(context.siteDir, 'docs', 'authors.yml');
      
      if (fs.existsSync(authorsPath)) {
        const authorsContent = fs.readFileSync(authorsPath, 'utf8');
        return yaml.load(authorsContent);
      }
      
      return {};
    },
  };
};
