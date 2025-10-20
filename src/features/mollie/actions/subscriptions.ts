'use server'

import { currentUser } from '@clerk/nextjs/server'
import {
  getPayments,
  getSubscriptions,
  cancelSubscription as cancelMollieSubscription,
  updateSubscription as updateMollieSubscription,
  createSubscription as createMollieSubscription,
  getMandates,
  createPayment,
} from '../api'
import { revalidatePath } from 'next/cache'

/**
 * Get current user's Mollie customer ID from Clerk
 */
async function getCustomerId() {
  const user = await currentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  const customerId = user.publicMetadata?.mollieCustomerId as string | undefined
  if (!customerId) {
    throw new Error('No Mollie customer ID found. Please make a payment first.')
  }

  return customerId
}

/**
 * Fetch user's payment history
 */
export async function fetchPaymentHistory() {
  try {
    const customerId = await getCustomerId()
    const payments = await getPayments(customerId)

    // Serialize Mollie Payment objects to plain JSON
    const serializedPayments = payments.map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      description: payment.description,
      status: payment.status,
      createdAt: payment.createdAt,
      paidAt: payment.paidAt,
      method: payment.method,
    }))

    return {
      success: true,
      payments: serializedPayments,
    }
  } catch (error) {
    console.error('Failed to fetch payment history:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch payments',
      payments: [],
    }
  }
}

/**
 * Fetch user's subscriptions
 */
export async function fetchSubscriptions() {
  try {
    const customerId = await getCustomerId()
    const subscriptions = await getSubscriptions(customerId)

    // Serialize Mollie Subscription objects to plain JSON
    const serializedSubscriptions = subscriptions.map((subscription) => ({
      id: subscription.id,
      amount: subscription.amount,
      description: subscription.description,
      status: subscription.status,
      interval: subscription.interval,
      createdAt: subscription.createdAt,
      nextPaymentDate: subscription.nextPaymentDate,
      canceledAt: subscription.canceledAt,
    }))

    return {
      success: true,
      subscriptions: serializedSubscriptions,
    }
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch subscriptions',
      subscriptions: [],
    }
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const customerId = await getCustomerId()
    await cancelMollieSubscription(customerId, subscriptionId)

    revalidatePath('/mijn-jesus-central/geven')

    return {
      success: true,
      message: 'Subscription cancelled successfully',
    }
  } catch (error) {
    console.error('Failed to cancel subscription:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to cancel subscription',
    }
  }
}

/**
 * Update subscription amount
 */
export async function updateSubscriptionAmount(
  subscriptionId: string,
  amount: string,
  description?: string,
) {
  try {
    const customerId = await getCustomerId()

    // Format amount to 2 decimals
    const formattedAmount = Number(amount).toFixed(2)

    await updateMollieSubscription(
      customerId,
      subscriptionId,
      {
        currency: 'EUR',
        value: formattedAmount,
      },
      description,
    )

    revalidatePath('/mijn-jesus-central/geven')

    return {
      success: true,
      message: 'Subscription updated successfully',
    }
  } catch (error) {
    console.error('Failed to update subscription:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to update subscription',
    }
  }
}

/**
 * Create a new subscription
 */
export async function createNewSubscription(
  amount: string,
  interval: string,
  description: string,
) {
  try {
    const customerId = await getCustomerId()
    const user = await currentUser()

    if (!user) {
      throw new Error('User not authenticated')
    }

    // Get mandates
    const mandates = await getMandates(customerId)
    const validMandate = mandates.find((m) => m.status === 'valid')

    if (!validMandate) {
      // Need to create a first payment to set up mandate
      const name = user.fullName || user.firstName || 'Unknown'
      const email = user.emailAddresses[0]?.emailAddress || ''

      const redirectUrl = await createPayment(
        amount,
        true, // recurring
        description,
        name,
        email,
      )

      return {
        success: true,
        requiresSetup: true,
        redirectUrl,
        message:
          'Please complete the first payment to set up your subscription',
      }
    }

    // Format amount
    const formattedAmount = Number(amount).toFixed(2)

    // Calculate start date (tomorrow)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + 1)

    await createMollieSubscription(
      customerId,
      {
        currency: 'EUR',
        value: formattedAmount,
      },
      interval,
      description,
      startDate.toISOString().split('T')[0],
      validMandate.id,
      {
        email: user.emailAddresses[0]?.emailAddress || '',
        name: user.fullName || user.firstName || 'Unknown',
      },
    )

    revalidatePath('/mijn-jesus-central/geven')

    return {
      success: true,
      requiresSetup: false,
      message: 'Subscription created successfully',
    }
  } catch (error) {
    console.error('Failed to create subscription:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to create subscription',
    }
  }
}
