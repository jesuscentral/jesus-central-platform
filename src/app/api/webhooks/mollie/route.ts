import { NextResponse } from "next/server";
import { createSubscription, getPayment, pageMandates } from "@/features/mollie";

function nextCycleDate(interval: "1 month" | "1 week" | "1 year" | string) {
  const d = new Date();
  if (interval.includes("month")) d.setMonth(d.getMonth() + 1);
  else if (interval.includes("week")) d.setDate(d.getDate() + 7);
  else if (interval.includes("year")) d.setFullYear(d.getFullYear() + 1);
  else if (interval.includes("day"))
    d.setDate(d.getDate() + parseInt(interval));
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const paymentId = String(form.get("id") || "");
    console.log(paymentId);
    if (!paymentId) return NextResponse.json({ ok: true });

    const payment = await getPayment(paymentId);

    const isPaidOrAuth =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (payment as any).isPaid?.() || (payment as any).isAuthorized?.();

    if (!isPaidOrAuth) return NextResponse.json({ ok: true });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customerId = (payment as any).customerId as string;
    if (!customerId) return NextResponse.json({ ok: true });

    // Ensure there is a valid mandate on the customer
    const mandatesPage = await pageMandates(customerId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validMandate = (mandatesPage as any)._embedded?.mandates?.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (m: any) => m.status === "valid"
    );
    if (!validMandate) return NextResponse.json({ ok: true });

    const interval = "1 month"; // adjust as needed
    await createSubscription(
      customerId,
      payment.amount,
      interval,
      payment.description,
      nextCycleDate(interval),
      validMandate.id,
      payment.metadata as Record<string, string>
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}
