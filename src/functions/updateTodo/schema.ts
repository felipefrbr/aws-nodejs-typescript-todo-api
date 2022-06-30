export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    done: { type: 'boolean' },
  },
  required: ['name', 'done']
} as const;
