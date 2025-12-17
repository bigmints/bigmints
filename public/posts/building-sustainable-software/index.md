# Building Sustainable Software

Every line of code we write eventually consumes electricity. In an age of climate crisis, digital sustainability is becoming a core engineering responsibility.

## The Cost of Bloat

Modern web applications are heavy.

- Unused JavaScript
- High-res images that aren't optimized
- Frequent polling instead of WebSockets

### Optimizing for the Planet

Here is a snippet of how to lazy load an image in React to save bandwidth:

```tsx
<img 
  src="heavy-image.jpg" 
  loading="lazy" 
  alt="Eco friendly loading" 
/>
```

## Green Hosting

Moving your workloads to regions powered by renewable energy (like GCP's `europe-west1` or `us-central1` depending on current mix) can reduce carbon intensity by over 50%.

Let's build a greener web, one kilobyte at a time.