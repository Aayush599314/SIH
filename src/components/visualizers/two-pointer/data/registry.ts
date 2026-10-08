import type { TwoPointerProblem, ProblemSummary, Pattern } from '../types';
import { twoSumII } from '../algorithms/twoSumII';
import { validPalindrome } from '../algorithms/validPalindrome';
import { containerWithMostWater } from '../algorithms/containerWater';
import { moveZeroes } from '../algorithms/moveZeroes';
import { removeDuplicates } from '../algorithms/removeDuplicates';
import { sortColors } from '../algorithms/sortColors';
import { threeSum } from '../algorithms/threeSum';
import { reverseString } from '../algorithms/reverseString';
import { isSubsequence } from '../algorithms/isSubsequence';
import { removeElement } from '../algorithms/removeElement';
import { linkedListCycle } from '../algorithms/linkedListCycle';
import { middleOfLinkedList } from '../algorithms/middleLinkedList';
import { trappingRainWater } from '../algorithms/trappingRainWater';

export const problems: TwoPointerProblem[] = [
  twoSumII,
  validPalindrome,
  reverseString,
  moveZeroes,
  removeElement,
  removeDuplicates,
  isSubsequence,
  middleOfLinkedList,
  containerWithMostWater,
  sortColors,
  threeSum,
  linkedListCycle,
  trappingRainWater,
];

export const problemsByPattern: Record<Pattern, TwoPointerProblem[]> = {
  'Opposite Direction': [twoSumII, containerWithMostWater, trappingRainWater],
  'Fast & Slow': [moveZeroes, removeElement, removeDuplicates],
  'Linked List': [middleOfLinkedList, linkedListCycle],
  Partition: [sortColors],
  String: [validPalindrome, reverseString, isSubsequence],
  'Sorting + Two Pointers': [threeSum],
};

export const problemSummaries: ProblemSummary[] = problems.map((p) => ({
  id: p.metadata.id,
  title: p.metadata.title,
  difficulty: p.metadata.difficulty,
  pattern: p.metadata.pattern,
  dataStructure: p.metadata.dataStructure,
  companies: p.metadata.companies,
  leetcode: p.metadata.leetcode,
  visualizationType: p.metadata.visualizationType,
}));

export function getProblem(id: number): TwoPointerProblem | undefined {
  return problems.find((p) => p.metadata.id === id);
}

export const allPatterns: Pattern[] = [
  'Opposite Direction',
  'Fast & Slow',
  'Linked List',
  'Partition',
  'String',
  'Sorting + Two Pointers',
];

export const allCompanies = Array.from(
  new Set(problems.flatMap((p) => p.metadata.companies))
).sort();
