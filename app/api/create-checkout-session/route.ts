import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";
import { getURL } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";

export async function POST(request: Request) {
    const { price, quantity = 1, metadata = {} } = await request.json();

    try {
        const supabase = createRouteHandlerClient({
            cookies,
        });

        const { data: { user } } = await supabase.auth.getUser();

        const customer = await createOrRetrieveCustomer({
            uuid: user?.id || '',
            email: user?.email || ''
        });

        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'required',
            customer,
            line_items: [
                {
                    price: price.id,
                    quantity
                }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            subscription_data: {
                metadata: metadata, // Pass metadata here directly
                trial_period_days: 7 // Use trial_period_days for trials instead of trial_from_plan
            },
            success_url: `${getURL()}/account`,
            cancel_url: `${getURL()}`
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
            return new NextResponse('Internal Error', { status: 500 });
        } else {
            console.log("An unknown error occurred.");
            return new NextResponse('Internal Error', { status: 500 });
        }
    }
};
