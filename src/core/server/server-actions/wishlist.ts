'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { wishlists } from '@/lib/schema'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

const wishlistSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  budget: z.number().positive('Budget must be a positive number'),
})

export async function createWishlist(prevState: any, formData: FormData) {
  const { userId } = auth()
  if (!userId) {
    return { message: 'You must be logged in to create a wishlist', errors: {} }
  }

  const validatedFields = wishlistSchema.safeParse({
    name: formData.get('name'),
    budget: Number(formData.get('budget')),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
    }
  }

  const { name, budget } = validatedFields.data

  try {
    await db.insert(wishlists).values({
      userId,
      name,
      budget,
    })

    revalidatePath('/wishlists')
    return { message: 'Wishlist created successfully!', errors: {} }
  } catch (error) {
    return {
      message: 'Failed to create wishlist. Please try again.',
      errors: {},
    }
  }
}
