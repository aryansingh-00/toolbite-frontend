
import { tools } from './src/data/tools.js';

console.log('Total tools:', tools.length);
tools.forEach((tool, i) => {
  if (!tool.id) console.error(`Tool at index ${i} missing id`);
  if (!tool.title) console.error(`Tool at index ${i} missing title: ${tool.id}`);
  if (!tool.description) console.error(`Tool at index ${i} missing description: ${tool.id}`);
  if (!tool.tags) console.error(`Tool at index ${i} missing tags: ${tool.id}`);
  if (tool.tags && !Array.isArray(tool.tags)) console.error(`Tool at index ${i} tags is not an array: ${tool.id}`);
  if (!tool.icon) console.error(`Tool at index ${i} missing icon: ${tool.id}`);
  if (!tool.slug) console.error(`Tool at index ${i} missing slug: ${tool.id}`);
});
console.log('Validation complete');
