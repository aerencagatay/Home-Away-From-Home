# Milano: Home Away From Home — Prompts for Site Updates

Live site: homeawayfromhome.art
Screenshots can be found in google drive for reference.

---

## 1. Header

- Replace the header background color to black (`#0a0a0a`).
- Replace the "Info +" text button with a hamburger icon (3 horizontal bars made of CSS spans, ~20px wide, 1.5px tall, white, spaced 5px apart).
- Move the language toggle (IT) to sit to the left of the hamburger icon.
- Keep all existing click behavior — only the visual appearance changes.

---

## 2. Navigation menu

- Rename and reorder the menu items to:
  1. Exhibition
  2. Open Call
  3. Advisory Board
  4. Contact
- Only the visible labels change — the underlying navigation behavior stays the same.
- Style the close button (×) to have no background, no border, and no outline — just the × symbol in white.

---

## 3. Exhibition page

- Remove the page label from the top navigation bar — the title appears in the content below.
- The page title "Exhibition" sits at the top of the content area, left-aligned, large serif italic (~3.5rem).
- Below the title: exhibition description text in body copy (content is [TBD] — use placeholder text for now).
- Below the text: a text link "Apply to the Open Call →" in the gold accent color.
- Below that: a "Contributors" section. The heading "Contributors" is small, uppercase, wide letter-spacing, muted color.
- The contributors appear as a stacked list of rows. Each row has:
  - A thin top and bottom border
  - Left side: name in serif italic (~1rem), role in tiny uppercase muted text below it
  - Right side: an arrow "→" in muted color that nudges right on hover
  - On hover: the name turns gold
  - The full row is clickable and opens a full-screen bio overlay
- Contributors in this order:
  - Bethany Landrum — Co-Curator
  - Caroline Marie Duque — Co-Curator
  - Iona Anastassiadou — Co-Curator
  - Lara Mercan Şahin — Co-Curator
  - Sneha Mahato — Co-Curator
- Below the contributor list: a text link "Advisory Board →" in muted color that navigates to the Advisory Board page.
- Bio overlay (opens when a contributor row is clicked): full-screen dark overlay with the person's name large in serif italic, their role in small uppercase below, a thin horizontal rule, then bio text. A ✕ close button top-right. Clicking ✕ closes it. All bios are [TBD] — use placeholder text for now.

---

## 4. Advisory Board Page

- Remove the page label from the top navigation bar — the title appears in the content below.
- The page title "Advisory Board" sits at the top of the content area in serif italic (~3rem).
- Below it: a horizontal scrollable strip of five member columns, centered on the page.
- Each column is ~180px wide with:
  - Name in serif italic above the photo
  - Title in tiny uppercase muted text below the name
  - A 2:3 portrait photo placeholder box below (photos will be sent separately)
  - The entire column is clickable — name, title, and photo all trigger the overlay
  - On hover: photo dims slightly
- Members in alphabetical order by last name:
  - To be updated — To be updated
  - Dr. Sharon Hecker — Art Historian, Curator & Consultant
  - Valentina Kovalishina — Artist, Art Director & Founder
  - To be updated — To be updated
  - Paula Trommel — Global Head of Risk & Compliance, Hauser & Wirth
- Bio overlay (opens when any part of a member column is clicked): full-screen dark overlay with the person's name large in serif italic, their title in small uppercase below, a thin horizontal rule, then bio text. A ✕ close button top-right. Clicking ✕ closes it. All bios are [TBD] — use placeholder text for now.

---

## 5. Open Call Page

- Remove the page label from the top navigation bar — the title appears in the content below.
- The page title "Open Call for Artists" sits at the top of the content area, left-aligned, bold sans-serif (~4.5rem). It reads as two lines: "Open Call" / "for Artists".
- Below the title: four info rows separated by thin horizontal dividers. Each row has a small uppercase muted label (~0.7rem, wide letter-spacing) in a fixed ~130px left column, and the value on the right:
  - WHO CAN APPLY: "Artists at the start of their career who have lived, studied, or worked in Milan at some point. Still in the city or based somewhere else in the world. Must be at least 18 years old."
  - WHAT TO SUBMIT: "Up to 3 works, existing or new. All mediums welcome."
  - DEADLINE: "26 April 2026 · 23:59" — displayed in the gold accent color
  - EXHIBITION: "4–7 June 2026 · Rifugio Antiaereo · Piazza Grandi, Milan"
- At the bottom: a full-width gold pill button labelled "APPLY" that navigates to the application form.
- The whole page should fit on screen without scrolling.

---

## 6. Application form

- Keep the "Application" label from the top navigation bar.
- The form has a max width of ~620px, centered on the page.
- Three sections with headings in regular weight sans-serif (~1.1rem):

**About you**
- First name + Last name (side by side)
- Email + Phone (side by side)
- Website (full width)
- Current city (full width)
- "Your connection to Milan" (full-width textarea)
- All fields: dark background, subtle border, rounded corners (~8px). On focus: soft gold glow. Required fields marked with *.

**Works for consideration**
- Expandable work blocks (max 3). Each block has a header row with a status dot, work number, and a chevron to collapse/expand. Inside each block:
  - Image upload zone (dashed border, click to upload, shows filename when a file is selected)
  - Title + Year (side by side)
  - Medium + Type dropdown (side by side) — options: Unique work / Edition / Performance or durational / Site-specific
  - Dimensions: four small inline inputs (W / H / D / kg)
  - Installation notes (textarea)
- An "+ Add another work" button below, hidden once 3 blocks exist.
- Users can remove blocks (not available when only 1 block exists).

**Your materials**
- Artist statement (full-width textarea)
- CV upload + Portfolio PDF upload (side by side, same dashed upload zone style as image upload)
- "or" divider
- Portfolio URL (full width)
- End with a privacy checkbox and a full-width "Submit your work" button — disabled until checkbox is checked.
- After submission: hide the form and show a confirmation: "Thank you! Your application has been received. We'll be in touch by 20 May 2026."

---

*Content updates (bios, exhibition text, photos) will be sent separately/accessible in a google drive. All [TBD] markers show where content is coming.*

---

## To be addressed after initial build

- **Thank you page:** After form submission, the confirmation should redirect to a dedicated thank you page/view. Design to be shared separately.
- **Form handling:** The form needs a backend service to  send email notifications for submissions.
- **Security:** Ensure form submissions are protected — spam prevention and secure file handling should be considered before the form goes live.
