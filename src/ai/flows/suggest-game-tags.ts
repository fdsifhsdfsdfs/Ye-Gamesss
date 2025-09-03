'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting game tags based on image analysis and description processing.
 *
 * The flow takes an image and a description of a game as input, and uses AI to suggest relevant tags.
 * It exports:
 *   - `suggestGameTags`: The main function to trigger the game tag suggestion flow.
 *   - `SuggestGameTagsInput`: The input type for the suggestGameTags function.
 *   - `SuggestGameTagsOutput`: The output type for the suggestGameTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestGameTagsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the game, as a data URI that must include a MIME type and use Base64 encoding. Expected format: `data:<mimetype>;base64,<encoded_data>`.'
    ),
  description: z.string().describe('The description of the game.'),
});
export type SuggestGameTagsInput = z.infer<typeof SuggestGameTagsInputSchema>;

const SuggestGameTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags for the game.'),
});
export type SuggestGameTagsOutput = z.infer<typeof SuggestGameTagsOutputSchema>;

export async function suggestGameTags(input: SuggestGameTagsInput): Promise<SuggestGameTagsOutput> {
  return suggestGameTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestGameTagsPrompt',
  input: {schema: SuggestGameTagsInputSchema},
  output: {schema: SuggestGameTagsOutputSchema},
  prompt: `You are an AI assistant that suggests tags for games based on their description and a provided image.

  Analyze the following game description and image to identify relevant tags. Provide only the tags in the output, comma separated.

  Description: {{{description}}}
  Image: {{media url=photoDataUri}}

  Tags:`,
});

const suggestGameTagsFlow = ai.defineFlow(
  {
    name: 'suggestGameTagsFlow',
    inputSchema: SuggestGameTagsInputSchema,
    outputSchema: SuggestGameTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
