const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createLayout, createPage, createRedirect } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const pageLayout = path.resolve(`src/layouts/index.js`);
    const pageTemplate = path.resolve(`src/templates/page.js`);

    graphql(`
      {
        allMarkdownRemark(sort: { fields: [frontmatter___order] }) {
          edges {
            node {
              html
              fields {
                slug
              }
              frontmatter {
                title
                image
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.error(result.errors);
        reject(result.errors);
      }

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const { html, fields: { slug }, frontmatter: { title, image } } = node;
        const rootPage = slug.match(/\/([^\/]*)\//)[1];
        const hasContent = !!html;
        const layout = `page-${slug
          .replace(/\//g, '-')
          .slice(0, slug.length - 1)}`;

        if (hasContent) {
          createLayout({
            component: pageLayout,
            id: layout,
            context: {
              title,
              imageRegex: `/${image}/`,
            },
          });

          createPage({
            layout,
            path: slug,
            component: pageTemplate,
            context: {
              slug,
              subNavSlugRegex: `/${rootPage}/`,
            },
          });
        } else {
          const firstChildPage = result.data.allMarkdownRemark.edges.find(
            ({ node: { fields: { slug } } }) => {
              const containsRoot = ~slug.indexOf(rootPage);
              const isChildPage = slug.match(/\//g).length > 2;
              return containsRoot && isChildPage;
            }
          );
          const { node: { fields: { slug: childSlug } } } = firstChildPage;

          const redirects = [
            {
              f: slug,
              t: childSlug,
            },
            {
              f: slug.slice(0, slug.length - 1),
              t: childSlug.slice(0, childSlug.length - 1),
            },
          ];

          redirects.forEach(({ f, t }) => {
            createRedirect({
              fromPath: f,
              toPath: t,
              isPermanent: true,
              redirectInBrowser: true,
            });
          });
        }
      });

      resolve();
    });
  });
};
