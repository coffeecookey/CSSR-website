/* ==========================================================================
   data/people.js — THE ONLY FILE YOU EDIT TO CHANGE WHO IS ON THIS PAGE.
   --------------------------------------------------------------------------
   This is plain JSON wrapped in one assignment so a normal <script> tag can
   load it. That is what makes index.html work when you just double-click it
   (a browser blocks fetch() of a local file, but never blocks a <script>).

   Rules of thumb:
     - keep the trailing semicolon and the surrounding braces intact;
     - every key and string is double-quoted, items separated by commas,
       and NO comma after the last item in a list or object;
     - people appear on the page in the order they appear here.

   PHOTOS: everyone below is showing an initials tile, because the pictures
   from the sign-up form live in Google Drive and a web page cannot load them
   from there. Each person has their Drive link in a comment. To use a real
   photo, download it, save it as images/people/<first>-<last>.jpg, and add
       "photo": "images/people/gehna-dhawan.jpg",
   to that person. Anything still missing keeps its initials tile, so you can
   do them a few at a time.

   See README.md for copy-paste examples.
   ========================================================================== */

window.PEOPLE_DATA = {
  "groups": [
    { "id": "faculty", "label": "Faculty",          "layout": "card" },

    /* No PhD students on the roster at the moment. Put this line back when
       there are, and uncomment the PhD people further down.
    { "id": "phd",     "label": "PhD Students",     "layout": "card" },
    */

    { "id": "masters", "label": "Masters Students", "layout": "card" },
    { "id": "btech",   "label": "B.Tech Students",  "layout": "card" },

    /* "nav": false keeps this out of the People dropdown, because the navbar
       already has its own top-level "Our Work" link. */
    { "id": "ourwork", "label": "Our Work",         "layout": "list", "nav": false }
  ],

  "people": [

    /* ---------------------------------------------------------------- Faculty */
    {
      "group": "faculty",
      "name": "Dr. Rishabh Kaushal",
      "role": "Associate Professor",
      "photo": "images/people/rishabhkaushal.jpg",
      "links": {
        "web": "https://rishabhkaushal.github.io/",
        "scholar": "https://scholar.google.com/citations?user=Ra6L5R0AAAAJ&hl=en",
        "linkedin": "https://www.linkedin.com/in/rishabhkaushal/"
      }
    },

    /* ------------------------------------------------------------------- PhD
       Nobody on the roster yet. Uncomment this block and the "phd" group
       above when there is.

    {
      "group": "phd",
      "name": "Full Name",
      "role": "PhD · 1st year",
      "topic": "Research topic",
      "links": { "linkedin": "https://www.linkedin.com/in/example" }
    },
    */

    /* --------------------------------------------------- Masters (MCA) students */
    {
      "group": "masters",
      "name": "Rupashi Maurya",
      "role": "MCA IT · 2nd year",
      // "topic": "Gendered Discourse and Masculine Defaults in Indian YouTube communities",
      photo: "images/people/rupashi-maurya.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/rupashi-maurya" }
    },
    {
      "group": "masters",
      "name": "Pranati Sharma",
      "role": "MCA IT · 2nd year",
      // "topic": "Gendered Discourse and Masculine Defaults in Indian YouTube communities",
      photo: "images/people/pranati-sharma.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/pranati--sharma" }
    },
    {
      "group": "masters",
      "name": "Roshni",
      "role": "MCA IT · 2nd year",
      // "topic": "Gendered Discourse and Masculine Defaults in Indian YouTube communities",
      photo: "images/people/roshni.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/roshni8954" }
    },

    /* ------------------------------------------------------- B.Tech students */
    {
      "group": "btech",
      "name": "Rabbika Azmi",
      "role": "B.Tech IT · 3rd year",
      // "topic": "HinglishHate: A Target-Aware Benchmark for Hate Category Detection in Hinglish Memes",
      photo: "images/people/rabbikaazmi.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/rabbika-azmi" }
    },
    {
      "group": "btech",
      "name": "Tanisha Ojha",
      "role": "B.Tech IT · 3rd year",
      // "topic": "HinglishHate: A Target-Aware Benchmark for Hate Category Detection in Hinglish Memes",
      photo: "images/people/tanisha-ojha.png",
      "links": { "linkedin": "https://www.linkedin.com/in/tanisha-ojha-6bb1b0203/" }
    },
    {
      "group": "btech",
      "name": "Prisha Balyan",
      "role": "B.Tech IT · 3rd year",
      // "topic": "HinglishHate: A Target-Aware Benchmark for Hate Category Detection in Hinglish Memes",
      photo: "images/people/prisha-balyan.jpg",
      "links": { "linkedin": "https://www.linkedin.com/in/prisha-balyan-72343a318/" }
    },
    {
      "group": "btech",
      "name": "Mahi Arora",
      "role": "B.Tech ECE · 3rd year",
      // "topic": "Fact Checking for Indian politics",
      photo: "images/people/mahi-arora.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/mahi-arora-b0a92a322/" }
    },
    {
      "group": "btech",
      "name": "Gehna Dhawan",
      "role": "B.Tech IT · 3rd year",
      // "topic": "Narrative Analysis of Indian Political Deepfakes",
      photo: "images/people/gehna-dhawan.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/gehna-dhawan-27832432b" }
    },
    {
      "group": "btech",
      "name": "Anshika Prajapati",
      "role": "B.Tech IT · 3rd year",
      // "topic": "Narrative Analysis of Indian Political Deepfakes",
      photo: "images/people/anshika-prajapati.jpg",
      "links": { "linkedin": "https://www.linkedin.com/in/anshika-prajapati-36252b36b" }
    },
    {
      "group": "btech",
      "name": "Vidisha",
      "role": "B.Tech CSE-AI · 3rd year",
      // "topic": "Digital Public Discourse on Dowry Violence: A Computational Social Science perspective",
      photo: "images/people/vidisha.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/vidisha-477328214/" }
    },
    {
      "group": "btech",
      "name": "Manya Kalra",
      "role": "B.Tech CSE · 4th year",
      // "topic": "Digital Public Discourse on Dowry Violence: A Computational Social Science perspective",
      photo: "images/people/manya-kalra.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/manyakalra05/" }
    },
    {
      "group": "btech",
      "name": "Shriya Sandilya",
      "role": "B.Tech CSE-AI · 4th year",
      // "topic": "LLM based Synthetic Social Network Generation",
      photo: "images/people/shriya-sandilya.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/shriya-s/" }
    },
    {
      "group": "btech",
      "name": "Nihalika Raj Sharma",
      "role": "B.Tech IT · 3rd year",
      // "topic": "LLM based Synthetic Social Network Generation",
      photo: "images/people/nihalika-sharma.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/nihalika-raj-sharma/" }
    },
    {
      "group": "btech",
      "name": "Ritika Maan",
      "role": "B.Tech ECE-AI · 3rd year",
      // "topic": "Coordination through Reply Chains in Information Operation Campaigns",
      photo: "images/people/ritika-maan.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/ritika-maan/" }
    },
    {
      "group": "btech",
      "name": "Shubhika Jain",
      "role": "B.Tech AIML · 3rd year",
      // "topic": "Coordination through Reply Chains in Information Operation Campaigns",
      photo: "images/people/shubhika-jain.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/shubhika-jain-" }
    },
    {
      "group": "btech",
      "name": "Vriti Goyal",
      "role": "B.Tech ECE-AI · 3rd year",
      // "topic": "Coordination through Reply Chains in Information Operation Campaigns",
      photo: "images/people/vriti-goyal.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/vritigoyal" }
    },
    {
      "group": "btech",
      "name": "Midushi Maheshwari",
      "role": "B.Tech ECE-AI · 2nd year",
      // "topic": "AI-Generated and Human-Produced Children's Videos: A Comparative Analysis of Audiovisual Features",
      photo: "images/people/midushi-maheshwari.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/midushi-maheshwari" }
    },
    {
      "group": "btech",
      "name": "Muskan Goel",
      "role": "B.Tech AIML · 3rd year",
      // "topic": "AI-Generated and Human-Produced Children's Videos: A Comparative Analysis of Audiovisual Features",
      photo: "images/people/muskan-goel.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/muskan-goel-apr10" }
    },
    {
      "group": "btech",
      "name": "Charushi",
      "role": "B.Tech IT · 3rd year",
      // "topic": "AI-Generated and Human-Produced Children's Videos: A Comparative Analysis of Audiovisual Features",
      photo: "images/people/charushi.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/charushi06" }
    },
    {
      "group": "btech",
      "name": "Shubhi Mittal",
      "role": "B.Tech IT · 3rd year",
      // "topic": "Audit of AGTD Systems on Academic Text and Linguistic Diversity",
      photo: "images/people/shubhi-mittal.png",
      "links": { "linkedin": "https://www.linkedin.com/in/shubhi-mittal-74035b329" }
    },
    {
      "group": "btech",
      "name": "Payal",
      "role": "B.Tech CSE · 3rd year",
      // "topic": "Audit of AGTD Systems on Academic Text and Linguistic Diversity",
      photo: "images/people/payal.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/payal-cse" }
    },
    {
      "group": "btech",
      "name": "Arunima Mohan",
      "role": "B.Tech CSE-AI · 3rd year",
      // "topic": "Disagreement-based Collaborative Annotations: Can Disagreements lead to better LLM annotations?",
      photo: "images/people/arunima-mohan.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/arunima-mohan-9aa54b324" }
    },
    {
      "group": "btech",
      "name": "Ananya Ahuja",
      "role": "B.Tech CSE · 3rd year",
      // "topic": "Disagreement-based Collaborative Annotations: Can Disagreements lead to better LLM annotations?",
      photo: "images/people/ananya-ahuja.jpeg",
      "links": { "linkedin": "https://www.linkedin.com/in/ananya-ahuja01/" }
    },

    /* ------------------------------------------------------------- Our Work
       One row per project. "name" is the team, "role" is the kind of project
       and "topic" is the title, which renders as
           Team names — B.Tech Project: Title
       Statuses from the sign-up sheet are noted beside each entry; add one to
       the page by putting it on the end of "topic" if you want it shown. */
    {
      "group": "ourwork",
      "name": "Prisha Balyan, Rabbika Azmi, Tanisha Ojha",
      "role": "B.Tech Project",
      "topic": "HinglishHate: A Target-Aware Benchmark for Hate Category Detection in Hinglish Memes"
      // status: In progress
    },
    {
      "group": "ourwork",
      "name": "Mahi Arora",
      "role": "B.Tech Project",
      "topic": "Fact Checking for Indian politics"
      // status: In progress
    },
    {
      "group": "ourwork",
      "name": "Gehna Dhawan, Anshika Prajapati",
      "role": "B.Tech Project",
      "topic": "Narrative Analysis of Indian Political Deepfakes"
      // status: Completed, under review
    },
    {
      "group": "ourwork",
      "name": "Vidisha, Manya Kalra",
      "role": "B.Tech Project",
      "topic": "Digital Public Discourse on Dowry Violence: A Computational Social Science perspective"
      // status: In progress
    },
    {
      "group": "ourwork",
      "name": "Shriya Sandilya, Nihalika Raj Sharma",
      "role": "B.Tech Project",
      "topic": "LLM based Synthetic Social Network Generation"
      // status: Accepted at conf/journal
    },
    {
      "group": "ourwork",
      "name": "Ritika Maan, Shubhika Jain, Vriti Goyal",
      "role": "B.Tech Project",
      "topic": "Coordination through Reply Chains in Information Operation Campaigns"
      // status: Completed, still applying to conf/journal
    },
    {
      "group": "ourwork",
      "name": "Rupashi Maurya, Pranati Sharma, Roshni",
      "role": "MCA Project",
      "topic": "Gendered Discourse and Masculine Defaults in Indian YouTube communities"
      // status: In progress
    },
    {
      "group": "ourwork",
      "name": "Midushi Maheshwari, Muskan Goel, Charushi",
      "role": "B.Tech Project",
      "topic": "AI-Generated and Human-Produced Children's Videos: A Comparative Analysis of Audiovisual Features"
      // status: In progress
    },
    {
      "group": "ourwork",
      "name": "Shubhi Mittal, Payal",
      "role": "B.Tech Project",
      "topic": "Audit of AGTD Systems on Academic Text and Linguistic Diversity"
      // status: In progress
    },
    {
      "group": "ourwork",
      "name": "Arunima Mohan, Ananya Ahuja",
      "role": "B.Tech Project",
      "topic": "Disagreement-based Collaborative Annotations: Can Disagreements lead to better LLM annotations?"
      // status: Completed, still applying to conf/journal
    }
  ]
};
