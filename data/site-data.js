/* =====================================================================
   SITE DATA — edit this file to update the website content.
   No coding needed: change the text between quotes and save.
   ===================================================================== */

window.SITE = {
  name: "New Lakewood Chamber of Commerce",
  shortName: "Lakewood Chamber",
  city: "Lakewood, California",
  email: "info@example.org",            // TODO: replace when the domain is ready
  volunteerCredit: "[Your Name]",       // TODO: attribution name

  links: {
    join: "",       // TODO: Zeffy membership form URL
    contactForm: "" // TODO: Formspree endpoint, e.g. https://formspree.io/f/xxxxxx
  },

  /* Membership tiers (source: Feasibility Report, Sept 15 2026) */
  tiers: [
    { name: "Micro / Solo", who: "Solo owners, freelancers, consultants", size: "1–2 employees", price: 275 },
    { name: "Small Business", who: "Local retail, dining, service firms", size: "3–10 employees", price: 450 },
    { name: "Mid-Size", who: "Multi-unit and professional firms", size: "11–30 employees", price: 750 },
    { name: "Major Employer", who: "Large commercial employers", size: "31+ employees", price: 1250 },
    { name: "Civic Anchor", who: "Banking, health care, utilities", size: "Any size", price: 2500 }
  ],

  /* Events: date format YYYY-MM-DD. Past events hide automatically. */
  events: [
    {
      date: "2026-10-15", time: "7:30 AM",
      title: "Rise & Shine Lakewood: kickoff breakfast",
      place: "Host venue to be announced",
      description: "Our first morning networking breakfast. Bring business cards and a 30-second introduction.",
      link: ""
    },
    {
      date: "2026-11-19", time: "7:30 AM",
      title: "Rise & Shine Lakewood",
      place: "Host venue to be announced",
      description: "Monthly breakfast with member introductions and a guest speaker.",
      link: ""
    }
  ],

  /* Member directory. Delete the sample entries when real members join. */
  members: [
    { name: "Sample Bakery (example)", category: "Food & Dining", address: "Lakewood, CA", phone: "", website: "", description: "Example listing. Delete me." },
    { name: "Sample Accounting Group (example)", category: "Professional Services", address: "Lakewood, CA", phone: "", website: "", description: "Example listing. Delete me." },
    { name: "Sample Dental Care (example)", category: "Health", address: "Lakewood, CA", phone: "", website: "", description: "Example listing. Delete me." }
  ],

  /* Board of Directors */
  board: [
    { name: "To be announced", role: "Board Chair" },
    { name: "To be announced", role: "Treasurer" },
    { name: "To be announced", role: "Secretary" }
  ],

  /* Transparency documents. Put PDFs in the /docs folder. */
  documents: [
    // { title: "Board meeting minutes — October 2026", type: "Minutes", date: "2026-10-20", file: "docs/minutes-2026-10.pdf" }
  ]
};
