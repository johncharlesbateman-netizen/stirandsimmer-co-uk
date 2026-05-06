// Mailchimp embedded form configuration.
//
// To enable subscriptions:
// 1. In Mailchimp go to Audience → Signup forms → Embedded forms.
// 2. Copy the form's `action` URL (looks like
//    https://<dc>.list-manage.com/subscribe/post?u=XXXXX&id=YYYYY).
// 3. Paste it into MAILCHIMP_FORM_ACTION below.
// 4. Find the hidden anti-bot input in the embed code — it looks like
//    <input type="text" name="b_XXXXX_YYYYY" tabindex="-1" value="">.
//    Paste that `name` attribute into MAILCHIMP_HIDDEN_BOT_FIELD.
//
// Until both values are set, the form falls back to a "not configured"
// toast (see NewsletterSignup.tsx) so you can see it locally.

export const MAILCHIMP_FORM_ACTION =
  "REPLACE_WITH_YOUR_MAILCHIMP_URL";

export const MAILCHIMP_HIDDEN_BOT_FIELD = "";
