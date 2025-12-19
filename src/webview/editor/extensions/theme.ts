import { EditorView } from '@codemirror/view';

export const liveMarkdownTheme = EditorView.theme({
  '&': {
    backgroundColor: 'var(--vscode-editor-background, #1e1e1e)',
    color: 'var(--vscode-editor-foreground, #d4d4d4)',
  },
  '.cm-scroller': {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.6',
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
  '.cm-gutters': {
    backgroundColor: 'var(--vscode-editorGutter-background, transparent)',
    borderRight: 'none',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    color: 'var(--vscode-editorLineNumber-foreground, #858585)',
    fontFamily: 'var(--vscode-editor-font-family, monospace)',
    fontSize: '12px',
    minWidth: '3em',
    paddingRight: '16px',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'transparent',
    color: 'var(--vscode-editorLineNumber-activeForeground, #c6c6c6)',
  },
  '.cm-header': {
    fontWeight: 'bold',
    color: 'var(--vscode-textLink-foreground, #3794ff)',
  },
  '.cm-header-1': {
    fontSize: '2.4em',
    lineHeight: '1.3',
    marginTop: '0.5em',
  },
  '.cm-header-2': {
    fontSize: '1.9em',
    lineHeight: '1.35',
  },
  '.cm-header-3': {
    fontSize: '1.5em',
    lineHeight: '1.4',
  },
  '.cm-header-4': {
    fontSize: '1.25em',
    lineHeight: '1.4',
  },
  '.cm-header-5': {
    fontSize: '1.1em',
  },
  '.cm-header-6': {
    fontSize: '1em',
    opacity: '0.9',
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
