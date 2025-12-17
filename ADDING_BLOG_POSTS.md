# Adding a New Blog Post

To add a new blog post to your portfolio, follow these steps:

## 1. Create the Markdown File

Create your blog post content in `public/posts/[your-post-slug]/index.md`:

```bash
mkdir -p public/posts/my-new-post
touch public/posts/my-new-post/index.md
```

Write your content in markdown format. The first H1 heading will be automatically removed (since it's shown in the header).

## 2. Create the Metadata File

Create `src/data/posts/my-new-post.yaml` with your post metadata:

```yaml
slug: my-new-post
title: My New Post Title
excerpt: A compelling excerpt that will appear on the home page and blog listing.
date: Dec 16, 2024
readingTime: 5 min read
tags:
  - Design
  - Engineering
coverImage: https://picsum.photos/seed/mypost/1200/600
contentFile: posts/my-new-post/index.md
```

## 3. Add to Config Loader

Edit `utils/configLoader.ts` and add your post to the imports:

```typescript
import myNewPostYAML from '/src/data/posts/my-new-post.yaml?raw';
```

Then add it to the `postYamls` array:

```typescript
const postYamls = [
  yaml.load(futureOfInterfacesYAML),
  yaml.load(buildingSustainableSoftwareYAML),
  yaml.load(myNewPostYAML),  // Add your post here
];
```

## 4. Done!

Your new post will now appear on:
- Home page (latest posts section)
- Blog listing page
- Individual post page at `/#/blog/my-new-post`

## File Structure

```
public/posts/
└── my-new-post/
    ├── index.md        # Post content
    └── images/         # (optional) Post-specific images

src/data/posts/
└── my-new-post.yaml    # Post metadata
```

**Why this structure?**
- Markdown files stay in `public/posts/` so they can be fetched at runtime
- YAML metadata files are in `src/data/posts/` so they can be imported with Vite's `?raw` feature
- This gives you the best of both: type-safe imports and runtime content loading
