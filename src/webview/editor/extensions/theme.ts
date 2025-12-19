import { EditorView } from '@codemirror/view';

export const liveMarkdownTheme = EditorView.theme({
  '&': {
    backgroundColor: 'var(--vscode-editor-background, #1e1e1e)',
    color: 'var(--vscode-editor-foreground, #d4d4d4)',
  },
  '.cm-scroller': {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  '.cm-content': {
    caretColor: 'var(--vscode-editorCursor-foreground, #fff)',
  },
  '.cm-cursor': {
    borderLeftColor: 'var(--vscode-editorCursor-foreground, #fff)',
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: 'var(--vscode-editor-selectionBackground, #264f78)',
  },
  '.cm-activeLine': {
    backgroundColor: 'var(--vscode-editor-lineHighlightBackground, transparent)',
  },
  '.cm-header': {
    fontWeight: 'bold',
    color: 'var(--vscode-textLink-foreground, #3794ff)',
  },
  '.cm-header-1': {
    fontSize: '2em',
    lineHeight: '1.4',
  },
  '.cm-header-2': {
    fontSize: '1.5em',
    lineHeight: '1.4',
  },
  '.cm-header-3': {
    fontSize: '1.25em',
    lineHeight: '1.3',
  },
  '.cm-header-4': {
    fontSize: '1.1em',
  },
  '.cm-header-5': {
    fontSize: '1em',
  },
  '.cm-header-6': {
    fontSize: '0.9em',
  },
  '.cm-emphasis': {
    fontStyle: 'italic',
    color: 'var(--vscode-textPreformat-foreground, inherit)',
  },
  '.cm-strong': {
    fontWeight: 'bold',
    color: 'var(--vscode-textLink-activeForeground, inherit)',
  },
  '.cm-strikethrough': {
    textDecoration: 'line-through',
    opacity: '0.6',
  },
});
