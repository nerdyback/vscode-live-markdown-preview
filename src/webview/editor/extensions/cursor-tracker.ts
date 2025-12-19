import { StateField, EditorState, Transaction } from '@codemirror/state';

export const cursorLineField = StateField.define<number>({
  create(state: EditorState): number {
    const selection = state.selection.main;
    if (selection.empty) {
      return state.doc.lineAt(selection.head).number;
    }
    return -1;
  },

  update(currentLine: number, tr: Transaction): number {
    if (!tr.docChanged && !tr.selection) {
      return currentLine;
    }
    const selection = tr.newSelection.main;
    if (selection.empty) {
      return tr.state.doc.lineAt(selection.head).number;
    }
    return -1;
  },
});
