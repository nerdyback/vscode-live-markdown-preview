import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { cursorLineField } from './editor/extensions/cursor-tracker';
import { livePreviewPlugin } from './editor/extensions/live-preview';
import { liveMarkdownTheme } from './editor/extensions/theme';

declare const acquireVsCodeApi: () => {
  postMessage: (message: unknown) => void;
  getState: () => unknown;
  setState: (state: unknown) => void;
};

const vscode = acquireVsCodeApi();

let view: EditorView | null = null;
let isUpdatingFromExtension = false;

function createEditor(content: string) {
  const parent = document.getElementById('editor');
  if (!parent) return;

  if (view) {
    view.destroy();
  }

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged && !isUpdatingFromExtension) {
      vscode.postMessage({
        type: 'change',
        content: update.state.doc.toString(),
      });
    }
  });

  view = new EditorView({
    state: EditorState.create({
      doc: content,
      extensions: [
        markdown(),
        cursorLineField,
        livePreviewPlugin,
        liveMarkdownTheme,
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        updateListener,
        EditorView.lineWrapping,
      ],
    }),
    parent,
  });
}

function updateContent(content: string) {
  if (!view) {
    createEditor(content);
    return;
  }

  const currentContent = view.state.doc.toString();
  if (currentContent !== content) {
    isUpdatingFromExtension = true;
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: content,
      },
    });
    isUpdatingFromExtension = false;
  }
}

window.addEventListener('message', (event) => {
  const message = event.data;

  switch (message.type) {
    case 'init':
      createEditor(message.content);
      break;

    case 'update':
      updateContent(message.content);
      break;
  }
});

vscode.postMessage({ type: 'ready' });
