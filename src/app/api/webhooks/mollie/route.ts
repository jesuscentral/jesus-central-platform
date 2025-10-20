import { NextResponse } from 'next/server'
import { createSubscription, getPayment, pageMandates } from '@/features/mollie'

function nextCycleDate(interval: '1 month' | '1 week' | '1 year' | string) {
  const d = new Date()
  if (interval.includes('month')) d.setMonth(d.getMonth() + 1)
  else if (interval.includes('week')) d.setDate(d.getDate() + 7)
  else if (interval.includes('year')) d.setFullYear(d.getFullYear() + 1)
  else if (interval.includes('day')) d.setDate(d.getDate() + parseInt(interval))
  return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const paymentId = String(form.get('id') || '')
    console.log('Payment ID', paymentId)

    if (!paymentId) return NextResponse.json({ ok: true })

    const payment = await getPayment(paymentId)

    console.log('Payment', payment)

    const isPaid = payment.status === 'paid'

    if (!isPaid) return NextResponse.json({ ok: true })
    console.log('Is paid', isPaid)

    const customerId = payment.customerId
    if (!customerId) return NextResponse.json({ ok: true })
    console.log('Customer ID', customerId)

    const mandatesPage = await pageMandates(customerId)
    console.log('Mandates page', mandatesPage)

    const validMandate = mandatesPage.find(
      (mandate) => mandate.status === 'valid',
    )
    console.log('Valid mandate', validMandate)
    if (!validMandate) return NextResponse.json({ ok: true })

    const interval = '1 month'
    const subscription = await createSubscription(
      customerId,
      payment.amount,
      interval,
      payment.description,
      nextCycleDate(interval),
      validMandate.id,
      payment.metadata as Record<string, string>,
    )
    console.log('Subscription created', subscription)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ ok: true })
  }
}
