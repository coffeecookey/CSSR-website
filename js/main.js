/* ==========================================================================
   js/main.js — renders the People page from the data file.
   --------------------------------------------------------------------------
   Nothing about any individual person lives in this file or in index.html;
   it all comes from data/people.js (see loadData below). The DOM is built
   with createElement/textContent only, so values from the data file can
   never be interpreted as HTML.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     LINK_TYPES — the single place link types are configured.

       key     the key used in data/people.js ("linkedin", "scholar", ...)
       label   the accessible name, read out by screen readers and shown as
               the hover tooltip
       icon    optional list of SVG path shapes, drawn inside a 24x24 box.
               Leave `icon` out and the label is shown as plain text instead,
               so a new type still works with one line and no artwork.

     Links are displayed in the order written here. To add ORCID as text only:
         orcid: { label: "ORCID" },
     ------------------------------------------------------------------------ */
  var LINK_TYPES = {
    linkedin: {
      label: "LinkedIn",
      icon: ["M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"]
    },
    scholar: {
      label: "Google Scholar",
      icon: [
        "M5.242 13.769 0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z",
        "M12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"
      ]
    },
    github: {
      label: "GitHub",
      icon: ["M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"]
    },
    web: {
      /* A chain link - the usual "this person has a website" symbol. */
      label: "Website",
      icon: ["M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"]
    },
    x: {
      label: "X",
      icon: ["M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z"]
    },
    email: {
      label: "Email",
      icon: ["M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"]
    }
  };

  /* Fallback source, used only if data/people.js is missing. Needs a server
     (GitHub Pages or `python3 -m http.server`); browsers block fetch of a
     file:// URL. */
  var DATA_URL = "data/people.json";

  /* Honorifics ignored when working out someone's initials. Add more here. */
  var TITLES = ["prof", "dr", "mr", "ms", "mrs", "mx", "shri", "smt"];

  /* ========================================================================
     Data loading
     ======================================================================== */

  /* Prefers window.PEOPLE_DATA (set by the <script> tag in index.html, works
     offline) and falls back to fetching the .json over HTTP. Returns a
     promise so the caller can show a message if both routes fail. */
  function loadData() {
    if (window.PEOPLE_DATA) {
      return Promise.resolve(window.PEOPLE_DATA);
    }
    return fetch(DATA_URL).then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status + " for " + DATA_URL);
      }
      return response.json();
    });
  }

  /* ========================================================================
     Small helpers
     ======================================================================== */

  /* getInitials("Prof. Ananya Rao") -> "AR"
     Drops the honorifics listed in TITLES, then takes the first letter of the
     first two remaining words. Used for the placeholder tile. */
  function getInitials(name) {
    var words = String(name || "").trim().split(/\s+/).filter(function (word) {
      var bare = word.replace(/\./g, "").toLowerCase();
      return bare !== "" && TITLES.indexOf(bare) === -1;
    });
    var initials = words.slice(0, 2).map(function (word) {
      return word.charAt(0);
    }).join("");
    return initials.toUpperCase() || "?";
  }

  /* Shorthand for createElement + class + text. */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined && text !== null && text !== "") {
      node.textContent = String(text);
    }
    return node;
  }

  /* renderIcon — turns the path list in LINK_TYPES into an <svg>. The shapes
     use currentColor, so an icon always matches the colour of the text around
     it and needs no separate styling. It is marked aria-hidden because the
     link already carries the name in its aria-label. */
  function renderIcon(paths) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");

    svg.setAttribute("class", "links__icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    paths.forEach(function (shape) {
      var path = document.createElementNS(ns, "path");
      path.setAttribute("d", shape);
      path.setAttribute("fill", "currentColor");
      svg.appendChild(path);
    });

    return svg;
  }

  /* The URL a person's name should point at: their own site, else LinkedIn,
     else nothing (the name is then rendered as plain text). Change the
     priority by reordering this list. */
  function getNameUrl(person) {
    var links = person.links || {};
    return links.web || links.linkedin || "";
  }

  /* Name as a link when we have a URL for it, otherwise as a <span>. */
  function renderName(person, className) {
    var url = getNameUrl(person);
    var node = el(url ? "a" : "span", className, person.name);
    if (url) { node.href = url; }
    return node;
  }

  /* ========================================================================
     Rendering
     ======================================================================== */

  /* renderLinks — one <ul> of profile links for a person, in LINK_TYPES order.
     Every link key is optional; missing ones are simply skipped. Returns null
     when a person has no links at all, so callers can leave the row out.
     `variant` is "card" (centred) or "row" (right-aligned). */
  function renderLinks(person, variant) {
    var links = person.links || {};
    var list = el("ul", "links links--" + variant);
    var keys = Object.keys(LINK_TYPES);

    keys.forEach(function (key) {
      var url = links[key];
      if (!url) { return; }

      var type = LINK_TYPES[key];
      var item = el("li", "links__item");
      var link = el("a", "links__link");
      link.href = url;

      if (type.icon) {
        link.appendChild(renderIcon(type.icon));
      } else {
        link.textContent = type.label;   /* no artwork, so fall back to words */
      }

      /* An icon on its own says nothing to a screen reader, and a row of
         identical "LinkedIn" labels is ambiguous, so name the person too.
         The title gives sighted users a tooltip on hover. */
      link.setAttribute("aria-label", type.label + " : " + person.name);
      link.title = type.label;

      item.appendChild(link);
      list.appendChild(item);
    });

    return list.childNodes.length ? list : null;
  }

  /* renderPhoto — square portrait, or a white tile with the person's initials
     when `photo` is absent or the image 404s. To change the fallback, edit
     renderInitialsTile below. */
  function renderPhoto(person) {
    if (!person.photo) {
      return renderInitialsTile(person);
    }

    var img = el("img", "person-card__photo");
    img.src = person.photo;
    img.alt = "Portrait of " + person.name;
    img.loading = "lazy";
    img.addEventListener("error", function () {
      img.replaceWith(renderInitialsTile(person));
    });
    return img;
  }

  /* Decorative: the name is right below it, so it is hidden from assistive
     technology rather than announced as "AR". */
  function renderInitialsTile(person) {
    var tile = el("div", "person-card__placeholder", getInitials(person.name));
    tile.setAttribute("aria-hidden", "true");
    return tile;
  }

  /* renderCard — photo, name, role, topic, links; all centred.
     To add a field (say a thesis title), add one more el("p", ...) here and a
     matching rule in css/style.css. */
  function renderCard(person) {
    var card = el("article", "person-card");

    card.appendChild(renderPhoto(person));

    var heading = el("h3", "person-card__name");
    heading.appendChild(renderName(person, "person-card__link"));
    card.appendChild(heading);

    if (person.role) { card.appendChild(el("p", "person-card__role", person.role)); }
    if (person.topic) { card.appendChild(el("p", "person-card__topic", person.topic)); }

    var links = renderLinks(person, "card");
    if (links) { card.appendChild(links); }

    return card;
  }

  /* renderListRow — one compact <li>: **Name** — role: topic, links right.
     Used by groups with "layout": "list", which is how Our Work is laid out:
     the team in `name`, "B.Tech Project" in `role`, the title in `topic`. */
  function renderListRow(person) {
    var row = el("li", "person-row");

    var main = el("div", "person-row__main");
    main.appendChild(renderName(person, "person-row__name"));

    /* Join whichever of role and topic exist, giving
       "B.Tech Project: Narrative Analysis of Indian Political Deepfakes". */
    var details = [person.role, person.topic].filter(Boolean).join(": ");
    if (details) {
      main.appendChild(el("span", "person-row__meta", " - " + details));
    }
    row.appendChild(main);

    var links = renderLinks(person, "row");
    if (links) { row.appendChild(links); }

    return row;
  }

  /* renderGroup — one <section> for one entry in `groups`.
     Dispatches on `layout`: "list" gives compact rows, anything else gives the
     card grid. Add a third layout by adding a branch here plus its own
     render*** function. */
  function renderGroup(group, people) {
    var section = el("section", "people-section");
    section.id = sectionId(group.id);
    section.appendChild(el("h2", "people-section__title", group.label));

    if (group.layout === "list") {
      if (group.groupBy === "year") {
        renderYearGroups(section, people);
      } else {
        section.appendChild(buildList(people));
      }
    } else {
      var grid = el("div", "people-grid");
      people.forEach(function (person) {
        grid.appendChild(renderCard(person));
      });
      section.appendChild(grid);
    }

    return section;
  }

  /* A "Class of 2025" sub-heading plus a list, newest year first. Anyone
     without a `year` is listed last, under no sub-heading. */
  function renderYearGroups(section, people) {
    var years = [];
    people.forEach(function (person) {
      var year = person.year;
      if (year !== undefined && year !== null && years.indexOf(year) === -1) {
        years.push(year);
      }
    });
    years.sort(function (a, b) { return Number(b) - Number(a); });

    years.forEach(function (year) {
      section.appendChild(el("h3", "people-section__subtitle", "Class of " + year));
      section.appendChild(buildList(people.filter(function (person) {
        return person.year === year;
      })));
    });

    var undated = people.filter(function (person) {
      return person.year === undefined || person.year === null;
    });
    if (undated.length) {
      section.appendChild(buildList(undated));
    }
  }

  function buildList(people) {
    var list = el("ul", "people-list");
    people.forEach(function (person) {
      list.appendChild(renderListRow(person));
    });
    return list;
  }

  /* renderPage — sections in the order given by `groups`, each containing its
     people in the order they appear in the data file. Empty groups are not
     rendered at all. Returns the number of sections drawn. */
  function renderPage(data, root) {
    var groups = Array.isArray(data && data.groups) ? data.groups : [];
    var people = Array.isArray(data && data.people) ? data.people : [];
    var rendered = 0;

    groups.forEach(function (group) {
      var members = people.filter(function (person) {
        return person.group === group.id;
      });
      if (!members.length) { return; }
      root.appendChild(renderGroup(group, members));
      rendered += 1;
    });

    return rendered;
  }

  /* ========================================================================
     Navbar
     ======================================================================== */

  /* The id renderGroup puts on each section and the navbar links to. */
  function sectionId(groupId) {
    return "group-" + groupId;
  }

  /* renderNavMenu — fills the People dropdown from the same groups list that
     builds the page, so adding a group to the data file also adds it to the
     menu. Give a group "nav": false to keep it out of the menu, and note that
     a group nobody belongs to has no section, so it is skipped here too. */
  function renderNavMenu(groups) {
    var item = document.getElementById("nav-people");
    var menu = document.getElementById("nav-people-menu");
    if (!item || !menu) { return; }

    groups.forEach(function (group) {
      if (group.nav === false) { return; }
      if (!document.getElementById(sectionId(group.id))) { return; }

      var entry = el("li", "navbar__menu-item");
      var link = el("a", "navbar__menu-link", group.label);
      link.href = "#" + sectionId(group.id);
      entry.appendChild(link);
      menu.appendChild(entry);
    });

    /* Nothing to drop down to, so do not leave a dead button behind. */
    if (!menu.childNodes.length) { item.remove(); }
  }

  /* setupNavMenu — opens on click (which works on touch screens, unlike a
     :hover menu) and closes on a second click, on Escape, on choosing an
     entry, or on a click anywhere outside. aria-expanded is kept in step so
     screen readers announce the state. */
  function setupNavMenu() {
    var item = document.getElementById("nav-people");
    if (!item) { return; }

    var button = item.querySelector(".navbar__button");
    var menu = item.querySelector(".navbar__menu");

    function setOpen(open) {
      item.classList.toggle("navbar__item--open", open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function isOpen() {
      return item.classList.contains("navbar__item--open");
    }

    button.addEventListener("click", function () {
      setOpen(!isOpen());
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) { setOpen(false); }
    });

    document.addEventListener("click", function (event) {
      if (!item.contains(event.target)) { setOpen(false); }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        button.focus();
      }
    });
  }

  /* ========================================================================
     Start up
     ======================================================================== */

  function init() {
    var root = document.getElementById("people-root");
    var status = document.getElementById("status");

    document.getElementById("year").textContent = String(new Date().getFullYear());

    loadData().then(function (data) {
      var groups = Array.isArray(data && data.groups) ? data.groups : [];
      var rendered = renderPage(data, root);

      /* The menu links to the sections, so it is built after them. */
      renderNavMenu(groups);
      setupNavMenu();

      if (rendered === 0) {
        showStatus(status, "No people have been added yet. Add them in data/people.js.");
      }
    }).catch(function (error) {
      /* A visible message beats a blank page; the console has the detail. */
      showStatus(status, "Sorry — the list of people could not be loaded. " +
        "Check that data/people.js exists and contains valid data.");
      console.error("People page: failed to load data.", error);
    });
  }

  function showStatus(node, message) {
    node.textContent = message;
    node.hidden = false;
  }

  init();
}());
