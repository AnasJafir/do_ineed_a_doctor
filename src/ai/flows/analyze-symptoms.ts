'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing user-provided symptoms and providing a severity level, suggested next steps, and a suggested doctor specialty.
 *
 * - analyzeSymptoms - A function that accepts symptom descriptions and returns an AI assessment.
 * - AnalyzeSymptomsInput - The input type for the analyzeSymptoms function.
 * - AnalyzeSymptomsOutput - The return type for the analyzeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSymptomsInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of the symptoms the user is experiencing.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo related to the symptoms, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeSymptomsInput = z.infer<typeof AnalyzeSymptomsInputSchema>;

const AnalyzeSymptomsOutputSchema = z.object({
  severityLevel: z
    .enum(['low', 'moderate', 'high'])
    .describe('The severity level of the symptoms.'),
  suggestedNextStep: z
    .string()
    .describe(
      'Detailed and specific suggested next steps for the user (e.g., specific home care measures, when to contact a pharmacist, specific reasons to see a doctor, or what constitutes an emergency room visit).'
    ),
  suggestedDoctorSpecialty: z
    .string()
    .describe(
      'The specialty of the doctor the user should consult (e.g., General Practitioner, Cardiologist, Dermatologist). Provide "N/A" if not applicable or if the next step does not involve a doctor.'
    ),
  explanation: z
    .string()
    .describe('A human-readable explanation of the AI assessment.'),
});
export type AnalyzeSymptomsOutput = z.infer<typeof AnalyzeSymptomsOutputSchema>;

export async function analyzeSymptoms(
  input: AnalyzeSymptomsInput
): Promise<AnalyzeSymptomsOutput> {
  return analyzeSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSymptomsPrompt',
  input: {schema: AnalyzeSymptomsInputSchema},
  output: {schema: AnalyzeSymptomsOutputSchema},
  prompt: `You are an AI assistant specializing in providing medical guidance based on user-reported symptoms.

  Analyze the following symptoms provided by the user and provide a severity level (low, moderate, high), detailed suggested next steps, a suggested doctor specialty if applicable, and a brief explanation.
  
  For the 'suggestedNextStep' field, be specific and provide actionable advice. For example, if suggesting home care, mention specific measures like rest, hydration, or over-the-counter medications if appropriate. If suggesting a doctor visit, explain why and what to expect. If suggesting an emergency room, list clear criteria.

  For the 'suggestedDoctorSpecialty' field, provide the medical specialty (e.g., General Practitioner, Cardiologist, Dermatologist). If a doctor visit is not the primary next step (e.g. rest at home, see pharmacist), or if the specialty is not clear, provide "N/A".

Symptoms: {{{symptoms}}}

{{#if photoDataUri}}
Photo: {{media url=photoDataUri}}
{{/if}}

Please provide your response in the following JSON format:
{
  "severityLevel": "...",
  "suggestedNextStep": "...",
  "suggestedDoctorSpecialty": "...",
  "explanation": "..."
}
`,
});

const analyzeSymptomsFlow = ai.defineFlow(
  {
    name: 'analyzeSymptomsFlow',
    inputSchema: AnalyzeSymptomsInputSchema,
    outputSchema: AnalyzeSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
