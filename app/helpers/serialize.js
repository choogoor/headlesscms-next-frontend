// import { Fragment } from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';

const serialize = (children, key) => {
  return children.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span key={key + i} dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if (node.bold) {
        text = <strong key={key + i}>{text}</strong>;
      }

      if (node.code) {
        text = <code key={key + i}>{text}</code>;
      }

      if (node.italic) {
        text = <em key={key + i}>{text}</em>;
      }

      return <>{text}</>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case 'h1':
        return <h1 key={key + i}>{serialize(node.children)}</h1>;
      // Iterate through all headings here...
      case 'h6':
        return <h6 key={key + i}>{serialize(node.children)}</h6>;
      case 'blockquote':
        return <blockquote key={key + i}>{serialize(node.children)}</blockquote>;
      case 'ul':
        return <ul key={key + i}>{serialize(node.children)}</ul>;
      case 'ol':
        return <ol key={key + i}>{serialize(node.children)}</ol>;
      case 'li':
        return <li key={key + i}>{serialize(node.children)}</li>;
      case 'link':
        return (
          <a href={escapeHTML(node.url)} key={key + i}>
            {serialize(node.children)}
          </a>
        );

      default:
        return <p key={key + i}>{serialize(node.children)}</p>;
    }
  });
}

export default serialize;