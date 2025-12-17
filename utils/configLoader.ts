import yaml from 'js-yaml';
import { SiteConfig } from '../types';

import profileYAML from '/src/data/profile.yaml?raw';
import spacecraftYAML from '/src/data/projects/spacecraft.yaml?raw';
import xtaraYAML from '/src/data/projects/xtara.yaml?raw';
import saveadayYAML from '/src/data/projects/saveaday.yaml?raw';
import bappnowYAML from '/src/data/projects/bappnow.yaml?raw';

// Import blog post metadata
import futureOfInterfacesYAML from '/src/data/posts/future-of-interfaces.yaml?raw';
import buildingSustainableSoftwareYAML from '/src/data/posts/building-sustainable-software.yaml?raw';

/**
 * Extracts the first paragraph from a markdown file to use as excerpt
 */
async function extractExcerpt(contentFile: string): Promise<string> {
  try {
    const response = await fetch(`/${contentFile}`);
    const markdown = await response.text();

    // Find the first paragraph (text after any frontmatter and headings)
    const lines = markdown.split('\n');
    let inFrontmatter = false;
    let excerpt = '';

    for (const line of lines) {
      // Skip frontmatter
      if (line.trim() === '---') {
        inFrontmatter = !inFrontmatter;
        continue;
      }
      if (inFrontmatter) continue;

      // Skip empty lines and headings
      if (!line.trim() || line.trim().startsWith('#')) continue;

      // Found first paragraph
      excerpt = line.trim();
      break;
    }

    return excerpt || 'No excerpt available';
  } catch (error) {
    console.warn(`Could not extract excerpt from ${contentFile}:`, error);
    return 'No excerpt available';
  }
}

/**
 * Loads and merges all YAML configuration files into a single SiteConfig object
 */
export async function loadConfig(): Promise<SiteConfig> {
  try {
    // Load profile data
    const profileData = yaml.load(profileYAML) as any;

    // Load all project files
    const projects = [
      yaml.load(spacecraftYAML),
      yaml.load(xtaraYAML),
      yaml.load(saveadayYAML),
      yaml.load(bappnowYAML),
    ];

    // Load all blog post files
    const postYamls = [
      yaml.load(futureOfInterfacesYAML),
      yaml.load(buildingSustainableSoftwareYAML),
    ];

    // Extract excerpts from markdown files if not provided
    const posts = await Promise.all(
      postYamls.map(async (post: any) => {
        if (!post.excerpt && post.contentFile) {
          post.excerpt = await extractExcerpt(post.contentFile);
        }
        return post;
      })
    );

    // Merge into SiteConfig structure
    const config: SiteConfig = {
      profile: {
        name: profileData.name,
        role: profileData.role,
        location: profileData.location,
        bio: profileData.bio,
        avatar: profileData.avatar,
        email: profileData.email,
        phone: profileData.phone,
        socials: profileData.socials,
      },
      resume: profileData.resume,
      projects: projects as any[],
      posts: posts as any[],
    };

    return config;
  } catch (error) {
    console.error('Error loading config:', error);
    throw error;
  }
}
