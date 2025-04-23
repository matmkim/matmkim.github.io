---
title: "How I Built This Website"
categories:
  - Blog
tags:
  - jekyll
  - minimal-mistakes
  - web development
  - github pages
date: 2024-07-12
---

I wanted a professional-looking personal website to showcase my work, share updates, and blog about my interests. After exploring various options, I settled on a static site generator approach. Here's how I built this website.

## The Framework: Jekyll + Minimal Mistakes

This website is built using [Jekyll](https://jekyllrb.com/), a popular static site generator, with the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme. Here's why I chose this combination:

### What is Jekyll?

Jekyll is a static site generator that transforms plain text files (mostly Markdown) into a complete website. Unlike dynamic sites that generate pages on-demand, Jekyll pre-builds all pages, resulting in:

- **Fast loading times**: Static HTML loads quickly
- **Better security**: No database vulnerabilities
- **Free hosting**: Can be hosted on GitHub Pages

### Why Minimal Mistakes?

Minimal Mistakes is a flexible Jekyll theme designed by Michael Rose. I chose it because:

- Clean, responsive design
- Excellent documentation
- Active development and community
- Built-in features like:
  - Customizable navigation
  - Author profiles
  - SEO optimizations
  - Social sharing buttons


## Implementation Process

### 1. Setting Up the Environment

I started by installing the necessary dependencies:

```bash
# Install Jekyll and Bundler
gem install jekyll bundler

# Create new Jekyll site
jekyll new my-website

# Install the Minimal Mistakes theme
gem "minimal-mistakes-jekyll"
```

### 2. Configuration

The main configuration happens in `_config.yml`, where I set:

- Site metadata (title, description)
- Author information
- Social media links
- Default layouts
- Navigation settings

### 3. Content Organization

Jekyll uses a specific directory structure:

- `_pages/`: Individual pages like About, Education
- `_posts/`: Blog and news articles
- `_layouts/`: HTML templates
- `_includes/`: Reusable components
- `assets/`: Images, CSS, and JavaScript

## Deployment

This site is deployed using GitHub Pages, which offers free hosting for Jekyll sites. 

## Future Improvements

I plan to continue enhancing this site with:

- Improved search functionality
- Dark mode toggle
- Resume(CV) page

## Conclusion

Jekyll and Minimal Mistakes provided an excellent foundation for building my personal website. The combination offers the perfect balance of simplicity, flexibility, and professional design. If you're considering building a personal site, I highly recommend this approach.

Feel free to reach out if you have questions about my implementation!