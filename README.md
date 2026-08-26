# The Edmund Burke Literary and Debating Society — Website

This is a simple website with no build tools, frameworks, or installs
required. It's just plain files: `.html` pages, one `.css` file for styling,
and one small `.js` file. You can open the HTML files directly in a browser,
or host them anywhere that serves static files.

## Pages

- `index.html` — Home page (About, What We Do, Join/Contact)
- `schedule.html` — Meeting schedule
- `resources.html` — Member resources
- `dues.html` — Dues & donations (has a placeholder for a PayPal button)
- `assets/css/style.css` — All colors, fonts, and layout
- `assets/js/main.js` — Just the mobile menu button, nothing else

## How to edit the text

You don't need to know how to code to update the words on the site.

1. Open any `.html` file in a plain text editor (Notepad, TextEdit, VS Code,
   even GitHub's own web editor).
2. Find the sentence you want to change and just retype it, leaving the
   `<...>` tags around it alone.
3. Search each file for the word `EDIT ME` — every one of those is a
   placeholder (email address, meeting time, dues amount, etc.) that's
   waiting for your real information. Once you fill one in, you can also
   remove the yellow dashed-box styling by deleting `class="placeholder"`
   from that tag if you want, though it's not required — the box only shows
   up if the text is short.
4. Save the file. If you're viewing it locally, just refresh your browser.

**Important:** whatever you change on `index.html` (like the contact email in
the footer), you'll want to change the same way on the other three pages,
since each page repeats its own copy of the header and footer.

## Adding the PayPal button

On `dues.html`, search for `PASTE PAYPAL BUTTON CODE HERE`. There are two
spots (one for dues, one for donations). Go to PayPal's button-creation tool,
generate a Donate or Buy Now button, and paste the code it gives you in place
of the dashed placeholder box. A plain PayPal.me link works too if you'd
rather not deal with embed code.

## Previewing the site on your own computer

You don't need any special software — just double-click `index.html` and it
will open in your web browser. Links between pages will work correctly this
way.

## Publishing the site online

This site isn't hosted anywhere yet. When you're ready to make it public,
the easiest free option is **GitHub Pages**, since the code already lives in
a GitHub repository:

1. On GitHub, go to the repository's **Settings** tab.
2. Click **Pages** in the left sidebar.
3. Under "Build and deployment," set the source branch to the branch this
   code is on, and the folder to `/ (root)`.
4. Save. GitHub will give you a URL (like
   `https://yourusername.github.io/repo-name/`) within a minute or two.

If you'd rather use a custom domain (like `edmundburkesociety.org`) or a
different host entirely, that's just as easy to do with these same files —
just ask and it can be set up.
