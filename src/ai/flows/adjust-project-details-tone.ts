'use server';

/**
 * @fileOverview Adjusts the tone of user-submitted project details to ensure a professional yet approachable style.
 *
 * - adjustProjectDetailsTone - A function that takes project details as input and returns the adjusted text.
 * - AdjustProjectDetailsToneInput - The input type for the adjustProjectDetailsTone function.
 * - AdjustProjectDetailsToneOutput - The return type for the adjustProjectDetailsTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustProjectDetailsToneInputSchema = z.object({
  projectDetails: z
    .string()
    .describe('The user-submitted project details that need tone adjustment.'),
});
export type AdjustProjectDetailsToneInput = z.infer<
  typeof AdjustProjectDetailsToneInputSchema
>;

const AdjustProjectDetailsToneOutputSchema = z.object({
  adjustedProjectDetails: z
    .string()
    .describe('The project details with a professional and approachable tone.'),
});
export type AdjustProjectDetailsToneOutput = z.infer<
  typeof AdjustProjectDetailsToneOutputSchema
>;

export async function adjustProjectDetailsTone(
  input: AdjustProjectDetailsToneInput
): Promise<AdjustProjectDetailsToneOutput> {
  return adjustProjectDetailsToneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustProjectDetailsTonePrompt',
  input: {schema: AdjustProjectDetailsToneInputSchema},
  output: {schema: AdjustProjectDetailsToneOutputSchema},
  prompt: `You are a professional copywriter specializing in refining text to be both professional and approachable. Analyze the following project details and adjust the language to ensure a professional yet approachable tone, suitable for submitting to a digital services agency.  The goal is to make the inquiry well-received and reflect positively on the business.  Maintain Australian spelling (e.g., "optimise").

Project Details: {{{projectDetails}}}`,
});

const adjustProjectDetailsToneFlow = ai.defineFlow(
  {
    name: 'adjustProjectDetailsToneFlow',
    inputSchema: AdjustProjectDetailsToneInputSchema,
    outputSchema: AdjustProjectDetailsToneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
