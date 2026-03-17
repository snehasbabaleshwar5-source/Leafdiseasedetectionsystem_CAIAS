'use server';
/**
 * @fileOverview A Genkit flow for generating detailed explanations for plant disease solutions and climate conditions.
 *
 * - generateDiseaseSolutionAdvice - A function that provides detailed explanations based on disease, solution, and climate.
 * - GenerativeDiseaseSolutionAdviceInput - The input type for the generateDiseaseSolutionAdvice function.
 * - GenerativeDiseaseSolutionAdviceOutput - The return type for the generateDiseaseSolutionAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerativeDiseaseSolutionAdviceInputSchema = z.object({
  disease: z.string().describe('The name of the detected plant disease.'),
  solution: z.string().describe('The initial, brief recommended solution for the disease.'),
  climate: z.string().describe('The initial, brief climate information associated with the disease.'),
});
export type GenerativeDiseaseSolutionAdviceInput = z.infer<typeof GenerativeDiseaseSolutionAdviceInputSchema>;

const GenerativeDiseaseSolutionAdviceOutputSchema = z.object({
  detailedSolution: z.string().describe('A detailed explanation of the recommended solution.'),
  detailedClimate: z.string().describe('A detailed explanation of the relevant climate conditions that contribute to the disease.'),
});
export type GenerativeDiseaseSolutionAdviceOutput = z.infer<typeof GenerativeDiseaseSolutionAdviceOutputSchema>;

export async function generateDiseaseSolutionAdvice(input: GenerativeDiseaseSolutionAdviceInput): Promise<GenerativeDiseaseSolutionAdviceOutput> {
  return generativeDiseaseSolutionAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generativeDiseaseSolutionAdvicePrompt',
  input: {schema: GenerativeDiseaseSolutionAdviceInputSchema},
  output: {schema: GenerativeDiseaseSolutionAdviceOutputSchema},
  prompt: `You are an expert botanist and plant disease specialist. Based on the detected plant disease, its recommended solution, and associated climate conditions, provide a detailed explanation for both the solution and the climate factors.

Detected Disease: {{{disease}}}
Recommended Solution: {{{solution}}}
Associated Climate: {{{climate}}}

---
Provide your detailed explanation in the following JSON format:
`,
});

const generativeDiseaseSolutionAdviceFlow = ai.defineFlow(
  {
    name: 'generativeDiseaseSolutionAdviceFlow',
    inputSchema: GenerativeDiseaseSolutionAdviceInputSchema,
    outputSchema: GenerativeDiseaseSolutionAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
