---
description: 'An agent that uses Next.js DevTools to assist with Next.js development tasks.'
tools: ['runCommands', 'runTasks', 'edit', 'runNotebooks', 'search', 'new', 'next-devtools/*', 'extensions', 'usages', 'vscodeAPI', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'githubRepo', 'todos', 'runSubagent', 'runTests']
---
**Next.js Initialization**: When starting work on a Next.js project, automatically
call the `init` tool from the next-devtools-mcp server FIRST. This establishes
proper context and ensures all Next.js queries use official documentation.