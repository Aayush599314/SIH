export function parseArray(input: string): number[] | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(/[,\s]+/).filter((p) => p.length > 0);
  const nums: number[] = [];
  for (const p of parts) {
    const n = Number(p);
    if (Number.isNaN(n)) return null;
    nums.push(n);
  }
  if (nums.length === 0) return null;
  return nums;
}

export function parseString(input: string): string[] | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  return trimmed.split('');
}

export function parseLinkedList(input: string): { value: number; next: number }[] | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(/->|→|,/).map((p) => p.trim()).filter((p) => p.length > 0);
  const nodes: { value: number; next: number }[] = [];
  for (const p of parts) {
    const n = Number(p);
    if (Number.isNaN(n)) return null;
    nodes.push({ value: n, next: -1 });
  }
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].next = i + 1 < nodes.length ? i + 1 : -1;
  }
  return nodes;
}

export function parseNumber(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  return Number.isNaN(n) ? null : n;
}

export function clampArrayLength(arr: number[], max = 30): number[] {
  if (arr.length <= max) return arr;
  return arr.slice(0, max);
}
