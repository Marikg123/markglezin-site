# Mark Glezin — Artist Portfolio

Personal website for figurative painter Mark Glezin.

Built with plain HTML, CSS, and JavaScript. No frameworks, no dependencies.

## Structure

```
├── index.html        # Homepage (hero painting)
├── works.html        # Gallery of 42 paintings
├── about.html        # Bio, CV, press
├── contact.html      # Contact form (Formspree)
├── css/style.css     # All styles
├── js/main.js        # Gallery, lightbox, mobile nav
└── images/
    └── paintings/    # 42 WebP-optimized paintings
```

## Contact Form Setup

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form ID
4. In `contact.html`, replace `YOUR_FORM_ID` in the `data-endpoint` attribute

## Deployment

Connected to Vercel for automatic deploys from this repository.
