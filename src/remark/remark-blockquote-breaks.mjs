import { newlineToBreak } from 'mdast-util-newline-to-break';
import { visit } from 'unist-util-visit';

/**
 * 仅在 blockquote 内把软换行转成 hard break（输出 <br>）。
 * 不影响普通段落，避免全文「单次换行即断行」。
 */
export default function remarkBlockquoteBreaks() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      newlineToBreak(node);
    });
  };
}
