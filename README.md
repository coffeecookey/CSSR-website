# People page — Computational Social Science Research Group

A single static page listing the group's members. Plain HTML, CSS and vanilla
JavaScript: no frameworks, no build step, no npm. Open `index.html` by
double-clicking it, or publish the folder with GitHub Pages — both work.

```
index.html               the page shell (no people in here)
css/style.css            all styling; every colour and size is a variable
js/main.js               renders the page from the data file
data/people.js           <- the only file you edit to change who is listed
data/people.json         optional copy of the same data (see note below)
images/people/           portrait photos, e.g. images/people/kavya-menon.jpg
images/website/          general site images (img1.jpeg, img2.jpeg, ...)
README.md                this file
```

## How the data is loaded

`data/people.js` is the source of truth. It is ordinary JSON wrapped in one
line:

```js
window.PEOPLE_DATA = { "groups": [ ... ], "people": [ ... ] };
```

It is loaded with a normal `<script>` tag, which is why the page works from
`file://`. A browser refuses to `fetch()` a local JSON file, so a `.json`-only
setup would show an empty page until you ran a web server.

`data/people.json` holds the same content for anything that wants machine-
readable JSON, and `js/main.js` falls back to fetching it if `data/people.js`
is ever missing. **It is not read when `data/people.js` loads normally**, so
if you keep it, update both — or just delete `data/people.json` and forget
about it.

> There is no `images/placeholder.svg`: when a photo is missing, the page draws
> a white tile with the person's initials instead, so no placeholder image file
> is needed.

## 1. Add a person

1. Save a square photo into `images/people/`, named in lower case with hyphens,
   e.g. `images/people/kavya-menon.jpg`. Around 480×480 px is plenty.
2. Open `data/people.js` and add an entry to the `"people"` list, in the
   position you want them to appear:

```js
{
  "group": "phd",
  "name": "Kavya Menon",
  "role": "PhD · 4th year",
  "topic": "Detecting coordinated misinformation campaigns",
  "photo": "images/people/kavya-menon.jpg",
  "links": {
    "linkedin": "https://www.linkedin.com/in/kavya-menon",
    "scholar": "https://scholar.google.com/citations?user=XXXX",
    "email": "mailto:kavya.menon@example.edu"
  }
},
```

Everything except `group` and `name` is optional. Leave out `photo` and the
initials tile appears; leave out any link and it is simply not shown. For
alumni, add `"year": 2025` — that decides which "Class of" heading they appear
under.

Remember: commas between entries, no comma after the last one.

## 2. Add a group (Interns, Postdocs, …)

Add one entry to `"groups"`, in the order you want the sections to appear, then
use its `id` as the `group` of each person:

```js
{ "id": "postdocs", "label": "Postdocs", "layout": "card" },
```

- `"layout": "card"` — photo grid (used for faculty and students).
- `"layout": "list"` — compact rows, **Name** — role: topic with links on the
  right. This is how Our Work is laid out: the team in `name`, the kind of
  project in `role`, the title in `topic`. Add `"groupBy": "year"` and a
  `"year"` on each entry for "Class of …" sub-headings, newest first.

A group with nobody in it is not rendered, so you can add the section first and
fill it later.

## 3. Add a link type (ORCID, Bluesky, …)

Edit the `LINK_TYPES` object near the top of `js/main.js` - one entry, and
nothing else anywhere. The entry is `label` (the accessible name and hover
tooltip) plus an optional `icon`:

```js
var LINK_TYPES = {
  linkedin: { label: "LinkedIn", icon: [ "M20.447 20.452h-3.554..." ] },
  orcid:    { label: "ORCID" },                    // <- added, no artwork
  scholar:  { label: "Google Scholar", icon: [ ... ] },
  ...
};
```

The key (`orcid`) is what you then use in a person's `links`. The order of the
entries is the order the links appear in.

**Icons.** `icon` is a list of SVG path shapes drawn inside a 24x24 box. Leave
it out and the label is shown as text instead, so a new type always works even
without artwork. To add one, find a 24x24 monochrome SVG (simpleicons.org has
most brand marks), copy the `d="..."` value out of each `<path>`, and paste
them into the list. Do not add `fill` - the code paints the shapes in
`currentColor` so they match the surrounding text, hover colour included.

Their size is `--icon-size` in `css/style.css` (currently `20px`), with
`--icon-pad` for the spacing each side.

While you are in that `:root` block, two other sizes you may want:
`--photo-size` (currently `180px`) is how big the portraits and initials
tiles are, and `--card-width` (`240px`) is how wide the text under them runs.

## 4. Change the hero banner

The banner is one `<img>` at the top of `index.html`. It spans the full width
of the window and is trimmed evenly off the top and bottom, keeping the
lettering in the middle of the picture:

```html
<header class="hero">
  <img class="hero__image" src="images/website/cssr3.png"
       alt="The Computational Social Science Research Group">
</header>
```

- **Different picture:** drop it in `images/website/` and change the `src`.
- **Taller or shorter:** change `--hero-max-height` in the `:root` block at
  the top of `css/style.css` (currently `380px`) and reload. A larger value
  shows more of the picture; a smaller one trims more away.
- The banner runs edge to edge and is trimmed **evenly off the top and
  bottom**, keeping the middle. The rule is
  `height: min(38vw, var(--hero-max-height))` with `object-fit: cover` and
  `object-position: center`.
- **If you swap in a differently-shaped banner, check that `38vw`.** It has to
  stay below the image's height-to-width ratio, or the strip ends up taller
  than the picture scaled to the window and gets cropped at the sides as well.
  `cssr3.png` is 1584x672, i.e. 42vw, so 38vw has room to spare. A 2:1 banner
  would be 50vw and also fine; a very wide 3:1 one would be 33vw, so you would
  need to lower the 38.
- **Alt text matters here.** The group's name is part of the picture, and the
  white top bar is commented out in `index.html`, so the `alt` is the only
  text telling screen readers and search engines whose page this is. Update it
  if you change the image. (If you switch the top bar back on, the name would
  then be on the page twice - make the banner decorative again with `alt=""`.)

## 5. Change the navbar

The white strip under the banner is the navbar. Its top-level items are plain
HTML in `index.html`:

```html
<li class="navbar__item">
  <a class="navbar__link" href="our-work.html">Our Work</a>
</li>
```

- **Add a top-level item:** copy that `<li>` and change the text and `href`.
  "Our Work" points at `#group-ourwork`, the Our Work section further down
  this page; point it at a separate page instead once you build one.
- **Taller or shorter:** change `--nav-height` in `css/style.css`
  (currently `52px`).
- **Dropdown triangle:** `--size-caret` (currently `14px`). The glyph itself
  is the `<span class="navbar__caret">` in `index.html` - `&#9660;` is the
  solid triangle, `&#9662;` a lighter outline one.
- **Colours:** `--nav-bg`, `--nav-text`, `--nav-hover` and `--nav-border`.
  They are separate from the page colours on purpose, so the bar can stay
  white over a blue page.

**The People dropdown builds itself** from the groups in `data/people.js`, so
a group you add in section 2 turns up in the menu with no extra work. Each
entry jumps to that section's heading. Two things it skips:

- a group nobody belongs to (there is no section to jump to);
- a group marked `"nav": false`, which is how you keep one out of the menu:

```js
{ "id": "alumni", "label": "Alumni", "layout": "list", "groupBy": "year", "nav": false },
```

The menu opens on click rather than hover, so it works on phones, and closes
on a second click, on <kbd>Esc</kbd>, on picking an entry, or on a click
outside. If you restyle it, keep the focus outline visible - the page-wide
one is white and would disappear against the white bar.

## 6. Change the colours

Every colour, font size and spacing value is a custom property in the `:root`
block at the top of `css/style.css`. Change it there and the whole page
follows:

```css
:root {
  --bg: #334DEF;            /* page background below the strip */
  --text: #FFFFFF;          /* body text, headings, links */
  --text-muted: #E2E6FC;    /* role, topic, footer */
  --link-hover: #DDE2FB;    /* dims on hover, because the page is dark */
  --divider: #6B7CF2;       /* hairlines between alumni rows */
  --placeholder-bg: #FFFFFF;   /* initials tile */
  --placeholder-text: #334DEF;
  --nav-bg: #FFFFFF;           /* the navbar strip, see section 5 */
  --nav-text: #334DEF;
  ...
}
```

The navbar has its own `--nav-*` tokens rather than using `--bg`/`--text`,
which is what lets it stay white while the page below it is blue.

To invert the whole theme, swap `--bg` with `--text`, swap `--placeholder-bg`
with `--placeholder-text`, and flip `--link-hover` the other way (on a light
page the hover should darken, not lighten).

If you change `--bg` or `--text`, check the contrast ratio stays at least
4.5:1 (e.g. with https://webaim.org/resources/contrastchecker/) so the page
remains readable and WCAG AA compliant.

## 7. Preview locally

- **Easiest:** double-click `index.html`. Everything works.
- **With a server** (needed only if you delete `data/people.js` and rely on the
  JSON): run `python3 -m http.server 8000` in this folder, then open
  <http://localhost:8000>.

After editing, reload with a hard refresh (<kbd>Cmd/Ctrl</kbd> +
<kbd>Shift</kbd> + <kbd>R</kbd>) so the browser picks up the new data file.

## 8. Deploy on GitHub Pages

1. Commit and push to GitHub:
   ```sh
   git add -A
   git commit -m "Add People page"
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   pick branch `main` and folder `/ (root)`, and save.
4. Wait a minute, then open `https://<user>.github.io/<repo>/`.

No build step is involved — whatever is on the branch is what gets served, so
adding a person is just an edit to `data/people.js` and a push.
