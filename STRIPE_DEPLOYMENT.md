# Stripe Deployment

## Environment

Add these variables to the production environment:

```env
STRIPE_SECRET=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CURRENCY=usd
```

Use `sk_test_...` and a test webhook secret for staging.

## Stripe Dashboard

1. Create a webhook endpoint for `https://your-domain.com/stripe/webhook`.
2. Subscribe it to `checkout.session.completed`.
3. Copy the endpoint signing secret into `STRIPE_WEBHOOK_SECRET`.

## Deploy Steps

Run the normal deployment commands, including:

```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
npm ci
npm run build
php artisan config:cache
php artisan route:cache
```

## Verification

Create a booking, open the payment page, and click `Pay with Stripe`. After a successful hosted checkout, the booking should return to the dashboard and later show `paid` after Stripe confirms the `checkout.session.completed` webhook.
