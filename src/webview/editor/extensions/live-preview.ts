import {
  ViewPlugin,
  ViewUpdate,
  Decoration,
  DecorationSet,
  EditorView,
  WidgetType,
} from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';
import { RangeSetBuilder } from '@codemirror/state';
import { cursorLineField } from './cursor-tracker';

class HiddenWidget extends WidgetType {
  toDOM() {
    const span = document.createElement('span');
    span.style.display = 'none';
    return span;
  }
  eq() {
    return true;
  }
}

const hiddenWidget = new HiddenWidget();

// reusable mark decorations (for text styling)
const headerMarks = {
  1: Decoration.mark({ class: 'cm-header cm-header-1' }),
  2: Decoration.mark({ class: 'cm-header cm-header-2' }),
  3: Decoration.mark({ class: 'cm-header cm-header-3' }),
  4: Decoration.mark({ class: 'cm-header cm-header-4' }),
  5: Decoration.mark({ class: 'cm-header cm-header-5' }),
  6: Decoration.mark({ class: 'cm-header cm-header-6' }),
};

// line decorations (for proper line height sync with gutter)
const headerLines = {
  1: Decoration.line({ class: 'cm-header-line cm-header-line-1' }),
  2: Decoration.line({ class: 'cm-header-line cm-header-line-2' }),
  3: Decoration.line({ class: 'cm-header-line cm-header-line-3' }),
  4: Decoration.line({ class: 'cm-header-line cm-header-line-4' }),
  5: Decoration.line({ class: 'cm-header-line cm-header-line-5' }),
  6: Decoration.line({ class: 'cm-header-line cm-header-line-6' }),
};

const emphasisMark = Decoration.mark({ class: 'cm-emphasis' });
const strongMark = Decoration.mark({ class: 'cm-strong' });
const strikeMark = Decoration.mark({ class: 'cm-strikethrough' });
const hiddenDeco = Decoration.replace({ widget: hiddenWidget });

export const livePreviewPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.buildDecorations(view);
    }

    update(update: ViewUpdate) {
      const oldLine = update.startState.field(cursorLineField);
      const newLine = update.state.field(cursorLineField);

      if (update.docChanged || update.viewportChanged || oldLine !== newLine) {
        this.decorations = this.buildDecorations(update.view);
      }
    }

    buildDecorations(view: EditorView): DecorationSet {
      const cursorLine = view.state.field(cursorLineField);
      const doc = view.state.doc;
      const decorations: { from: number; to: number; deco: Decoration }[] = [];

      for (const { from, to } of view.visibleRanges) {
        syntaxTree(view.state).iterate({
          from,
          to,
          enter: (node) => {
            const name = node.type.name;
            const nodeLineStart = doc.lineAt(node.from).number;
            const nodeLineEnd = doc.lineAt(node.to).number;
            const isOnCursorLine =
              cursorLine === -1 ||
              (cursorLine >= nodeLineStart && cursorLine <= nodeLineEnd);

            // headers
            if (name.startsWith('ATXHeading')) {
              const level = parseInt(name.replace('ATXHeading', ''), 10) as 1 | 2 | 3 | 4 | 5 | 6;
              if (level >= 1 && level <= 6) {
                // mark decoration for text styling
                decorations.push({
                  from: node.from,
                  to: node.to,
                  deco: headerMarks[level],
                });
                // line decoration for proper height sync with gutter
                const lineStart = doc.lineAt(node.from).from;
                decorations.push({
                  from: lineStart,
                  to: lineStart,
                  deco: headerLines[level],
                });
              }
            }

            // emphasis (italic)
            if (name === 'Emphasis') {
              decorations.push({
                from: node.from,
                to: node.to,
                deco: emphasisMark,
              });
            }

            // strong emphasis (bold)
            if (name === 'StrongEmphasis') {
              decorations.push({
                from: node.from,
                to: node.to,
                deco: strongMark,
              });
            }

            // strikethrough
            if (name === 'Strikethrough') {
              decorations.push({
                from: node.from,
                to: node.to,
                deco: strikeMark,
              });
            }

            // hide syntax marks when not on cursor line
            if (!isOnCursorLine) {
              if (name === 'HeaderMark') {
                // hide the # and trailing space
                let hideEnd = node.to;
                const lineEnd = doc.lineAt(node.from).to;
                const textAfter = doc.sliceString(node.to, Math.min(node.to + 1, lineEnd));
                if (textAfter === ' ') {
                  hideEnd = node.to + 1;
                }
                decorations.push({
                  from: node.from,
                  to: hideEnd,
                  deco: hiddenDeco,
                });
              } else if (name === 'EmphasisMark' || name === 'StrikethroughMark') {
                decorations.push({
                  from: node.from,
                  to: node.to,
                  deco: hiddenDeco,
                });
              }
            }
          },
        });
      }

      // sort by position for Decoration.set
      decorations.sort((a, b) => a.from - b.from || a.to - b.to);

      const builder = new RangeSetBuilder<Decoration>();
      for (const { from, to, deco } of decorations) {
        builder.add(from, to, deco);
      }

      return builder.finish();
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);
