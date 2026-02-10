# Personal Portfolio Website

**Structure, content intent, and best practices for a GitHub Pages portfolio site.**

- **Deployment**: GitHub Pages (static site)
- **Last Updated**: \[Date]

---

## 1. Technical Foundation

### 1.1 Requirements

- **Responsive Design**
  - Mobile‑first approach
  - Breakpoints at **640px**, **1024px**, **1280px**
- **Performance Targets**
  - First Contentful Paint \< 1.5s
  - Total page size \< 2MB
- **Accessibility**
  - WCAG 2.1 AA minimum
  - Semantic HTML
  - Full keyboard navigation support
  - Alt text for all images
  - Sufficient color contrast (4.5:1 for body text)
  - Screen reader tested

### 1.2 Browser Support

- **Modern browsers**: Last 2 versions of Chrome, Firefox, Safari, Edge

### 1.3 SEO Essentials

- **Title tag**: `"[Your Name] – [Primary Role/Focus]"`
- **Meta description**: 150–160 characters
- **Open Graph**: Configure OG title, description, and preview image for social sharing

### 1.4 Build Considerations

- **Stack**: Static HTML/CSS/JS or static site generator (Jekyll, Hugo, Eleventy)
- **Backend**: No database or server-side processing
- **Version Control**: All changes tracked with meaningful commit messages

---

## 2. Global Navigation (Sticky Header)

**Purpose**: Immediate identity and frictionless navigation.

### 2.1 Structure

- **Left**: Name or personal wordmark
  - Legible, professional typography
  - Strong, accessible color contrast
- **Right**: Primary navigation links
  - `About`
  - `Experience`
  - `Projects`
  - `Contact`

### 2.2 Behavior

- Sticky on scroll with subtle elevation (shadow or border) change
- Active state indication based on scroll position
- Mobile: Hamburger menu at \<768px, fully keyboard accessible
- Focus states clearly visible for keyboard users

### 2.3 Best Practices

- Navigation should never visually compete with main content
- Include a **“Skip to content”** link for screen readers and keyboard users
- Ensure touch targets are at least **44×44px** on mobile

---

## 3. Hero Section (First Impression)

**Purpose**: Establish identity, direction, and credibility within seconds.

### 3.1 Visual

- Professional photo (shoulders‑up, high quality)
- Contextually relevant background or clean solid color
- Soft gradient overlay ensuring **4.5:1** text contrast minimum
- Optimize main hero image:
  - Prefer **WebP**
  - Lazy load below‑the‑fold imagery

### 3.2 Content

- **Primary headline**: Your name and current role/focus
- **Secondary line**: One clear sentence about what you build and your technical focus
  - Avoid “aspiring” language
  - Example: *“I build reliable backend systems and data pipelines for \[domain].”*
- **Primary CTA**: “See Projects” (scrolls to Projects section)
- **Secondary CTA**: “Contact Me” (scrolls to Contact/Footer)

### 3.3 Best Practices

- Optimize for **clarity and confidence**, not cleverness
- Resume download belongs in navigation, not as a primary hero CTA
- Hero image should be **2× resolution** for retina but compressed to **\<200KB**

---

## 4. About / Positioning Statement

**Purpose**: Quickly answer “why this person?”

### 4.1 Constraints

- 2–3 sentences maximum
- Written in first person
- Directly below hero or as first major section

### 4.2 Content Focus

- Lead with **what you do** and **what problems you solve**
- Briefly reference:
  - Specific technical domains you enjoy
  - Types of systems or challenges you gravitate toward
  - How you approach problem‑solving

### 4.3 Example Structure

> “I specialize in \[technical area] and enjoy solving \[type of problem]. My work focuses on \[specific systems/approaches], and I'm particularly interested in \[direction or domain]. Currently exploring \[current learning or project focus].”

### 4.4 Best Practices

- Replace vague adjectives with concrete specifics
- Ensure every claim is supported by projects or experience below
- Treat this as **pattern‑matching ammo**, not a cover letter

---

## 5. Work Experience

**Purpose**: Demonstrate applied capability and responsibility.

### 5.1 Layout

- Card‑based design, visually consistent with project cards
- Most recent or most relevant roles first
- Each card includes:
  - Company name and role
  - Date range
  - 3–5 **impact‑focused** bullets

### 5.2 Bullet Style

- Start with strong action verbs
- Include outcomes when possible (metrics, scale, impact)
- Provide technical specificity where relevant  
  - Example: *“Built ETL pipeline processing 2M records/day using Python and Airflow, reducing processing time by 40%.”*

### 5.3 Best Practices

- Internships, research positions, and contract work all count
- Depth and specificity matter more than brand prestige
- If experience is limited, **lead with Projects** and move this section below

---

## 6. Skills and Technologies

**Purpose**: Enable fast pattern‑matching for recruiters and ATS systems.

### 6.1 Presentation

- Group skills by category with clear headings
- Visuals: rounded tokens/chips or simple lists
- Avoid skill bars or percentage ratings (they are not meaningful)

### 6.2 Example Categories

- **Languages**: Python, JavaScript, SQL, Go
- **Frameworks & Tools**: Django, React, Docker, Kubernetes
- **Data & Cloud**: PostgreSQL, AWS, BigQuery, Redis
- **Developer Practices**: Git, CI/CD, Testing, API Design

### 6.3 Best Practices

- Only list skills you can comfortably discuss in an interview
- Ensure each skill is evidenced by a project or experience
- Order by **proficiency or relevance**, not alphabetically

---

## 7. Education

**Purpose**: Establish academic grounding efficiently.

### 7.1 Layout

- Clean two‑column or single‑column card
- Core info:
  - Institution
  - Degree and field
  - Graduation date
  - GPA (if **3.5+**)
- Supplementary:
  - 4–6 most relevant courses or specializations

### 7.2 Content Guidance

- Coursework should signal depth in your focus areas
- Include in‑progress certifications when professionally relevant
- Add academic honors, publications, or conference presentations if meaningful

### 7.3 Best Practices

- Section should be informative but not dominant
- **Recent graduates**: place above Experience
- **Experienced professionals**: place below Projects

---

## 8. Projects (Core Section)

**Purpose**: Primary evidence of technical capability and judgment.

### 8.1 Presentation

- Card‑based grid layout
  - 2 columns on desktop
  - 1 column on mobile
- Each card contains:
  - Project screenshot or relevant visual
  - Project title
  - One‑sentence description
  - Tech tags (3–5 key technologies)
  - “Learn more” text or arrow indicator

- Entire card is clickable, linking to the individual project page
- Hover state: subtle elevation or border change
- Focus state: clear outline for keyboard navigation

### 8.2 Project Selection

- 3–6 strong projects (**quality over quantity**)
- Mix of personal and academic/professional work
- Each project should highlight different skills or problem types

### 8.3 Best Practices

- Screenshots optimized to **\<150KB** each
- Tech tags create scannable visual hierarchy
- Section should be visually prominent, second only to the hero
- Order by **technical depth or relevance**, not strict recency

---

## 9. Individual Project Pages

**Purpose**: Demonstrate reasoning, technical judgment, and growth.

### 9.1 Recommended Structure

- **Overview**: 2–3 sentences on what it is and why it exists
- **Problem**: What challenge or need drove this project?
- **Approach**: How you thought through the solution
- **Tech Stack**: Tools used and why they were chosen
- **Key Decisions & Tradeoffs**: What you optimized for and what you intentionally sacrificed
- **What I Learned**: Honest reflection on growth and takeaways
- **Links**: GitHub repo, live demo, or documentation (if applicable)

### 9.2 Optional Enhancements

- Architecture diagrams
- Code snippets with accompanying explanation
- Screenshots of key features
- Performance metrics or outcomes

### 9.3 Best Practices

- Use this space to prove you can **think**, not just ship code
- Explicit tradeoffs demonstrate maturity
- Honest reflection beats a polished but unrealistic narrative
- Keep each project page skimmable with clear headings

---

## 10. What I'm Looking For (Optional)

**Purpose**: Signal intentionality and help recruiters filter for fit.

### 10.1 Placement

- Between Projects and Contact, **or**
- Integrated into the About section

### 10.2 Content (2–4 sentences)

- Types of problems or domains that excite you
- Team culture or company stage preferences
- What you want to learn or build next

### 10.3 Example

> “I'm looking for roles where I can work on data infrastructure at scale, ideally in teams that value thoughtful system design and iterative improvement. I'm particularly interested in healthcare, climate, or education technology.”

### 10.4 Best Practices

- Small section, but powerful signaling
- Gives interviewers a natural conversation starter
- Avoid generic statements (“growth opportunity,” “fast‑paced environment”)

---

## 11. Contact / Footer

**Purpose**: Make contact effortless and close professionally.

### 11.1 Structure

- Primary heading: clear “Contact” or “Get in touch” label
- Email: clickable `mailto:` link
- Links: LinkedIn, GitHub (icons **plus** text labels for accessibility)
- Optional: Contact form (if you prefer not to expose your email to scrapers)

### 11.2 Footer Elements

- Copyright: `© [Year] [Your Name]. All rights reserved.`
- “Back to top” link (especially important on long pages)

### 11.3 Best Practices

- Icons alone are not accessible; always include text labels or `aria-label`s
- Ensure external links open in new tabs where appropriate (`rel="noopener"`)
- Make email and social links large touch targets (**44×44px minimum**)

---

## 12. Design Guardrails (Non‑Negotiables)

### 12.1 Avoid

- Heavy animations or auto‑playing content
- Parallax scrolling or scroll‑jacking
- Hidden navigation or gated content
- Making users hunt for projects, resume, or contact information
- Modal popups or interstitials
- Light text on light backgrounds or any insufficient contrast

### 12.2 Prioritize

- **Readability**
  - 16px minimum body text
  - 1.5 line height
  - Optimal line length: 50–75 characters
- **Accessibility**
  - Full keyboard navigation
  - Semantic HTML
  - ARIA labels where needed
- **Performance**
  - Optimized images
  - Minimal dependencies
  - \<2MB total page weight
- **Intentional Restraint**
  - Every element must earn its place

### 12.3 Testing Checklist

- Test on a **real mobile device** (not just browser DevTools)
- Navigate entire site using only the keyboard
- Run **Lighthouse** audit (aim for 90+ on all scores)
- Test with a screen reader (NVDA, JAWS, or VoiceOver)
- Verify all links work and open as expected
- Check color contrast with tools like WebAIM Contrast Checker

---

## 13. Maintenance & Iteration

### 13.1 Version Control

- Use meaningful commit messages describing changes
- Tag major redesigns or content updates
- Keep a changelog if making regular updates

### 13.2 Content Refresh Triggers

- New project completion
- Job change or major role shift
- Skill evolution (remove outdated skills, add current ones)
- Feedback from recruiters or interviewers

### 13.3 Analytics Considerations

- Optional: Google Analytics or Plausible for basic traffic insights
- Track key metrics:
  - Page views
  - Time on project pages
  - Referral sources
- Use insights to prioritize what to feature and refine

---

## 14. Quick Start Checklist (Pre‑Launch)

Before going live, confirm:

- All images are optimized and include descriptive alt text
- Resume PDF is up to date and properly linked
- All external links are tested and open in new tabs where appropriate
- Site is mobile responsive on a real device
- Accessibility tested with keyboard and screen reader
- Lighthouse scores are **90+** on all metrics
- Meta tags and Open Graph tags are configured
- Contact information is correct and easy to find
- Custom domain (if used) is configured and SSL enabled
- 404 page is configured (GitHub Pages default or custom)

---

**Remember**: This portfolio exists to get you conversations. Every element should either **build trust**, **demonstrate capability**, or **make contact easier**. When in doubt, cut.