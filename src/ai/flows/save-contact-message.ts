'use server';
/**
 * @fileOverview A flow for saving contact messages to Firestore.
 *
 * - saveContactMessage - A function that saves a contact message.
 */

import {z} from 'genkit';
import {ai} from '@/ai/genkit';
import {getFirestore} from 'firebase-admin/firestore';
import {getApps, initializeApp, cert} from 'firebase-admin/app';

// Define the schema for the contact message input
const ContactMessageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  projectDetails: z.string(),
  adjustedProjectDetails: z.string().optional(),
  createdAt: z.date(),
});

export type ContactMessageInput = z.infer<typeof ContactMessageSchema>;

// Helper function to initialize Firebase Admin SDK
function ensureFirebaseInitialized() {
  if (!getApps().length) {
    // When running in a Google Cloud environment, the service account credentials
    // can be automatically discovered.
    initializeApp();
  }
}

// Define the Genkit flow
const saveContactMessageFlow = ai.defineFlow(
  {
    name: 'saveContactMessageFlow',
    inputSchema: ContactMessageSchema,
    outputSchema: z.object({success: z.boolean(), messageId: z.string().optional()}),
  },
  async (message) => {
    ensureFirebaseInitialized();
    const db = getFirestore();

    try {
      const messagesCollection = db.collection('messages');
      const docRef = await messagesCollection.add({
          ...message,
          createdAt: new Date(message.createdAt), // Convert date from string if necessary
      });
      console.log('Message saved with ID:', docRef.id);
      return { success: true, messageId: docRef.id };
    } catch (error) {
      console.error('Error saving message to Firestore:', error);
      throw new Error('Failed to save message.');
    }
  }
);

// Export a wrapper function to be called from the client
export async function saveContactMessage(
  input: ContactMessageInput
): Promise<{ success: boolean; messageId?: string }> {
  return saveContactMessageFlow(input);
}
