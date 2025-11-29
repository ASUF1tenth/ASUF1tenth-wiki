import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "ASU F1TENTH",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "asuf1tenth.pages.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff", // White for the page background
          lightgray: "#f2f2f2", // Light gray for borders
          gray: "#b8b8b8", // Neutral gray for graph links and heavier borders
          darkgray: "#4e4e4e", // Dark gray for body text
          dark: "#000000", // Black for header text and icons
          secondary: "#e63946", // Vibrant red for link color and current graph node
          tertiary: "#a4161a", // Darker red for hover states and visited graph nodes
          highlight: "rgba(230, 57, 70, 0.15)", // Soft red for internal link background, highlighted text, and code lines
          textHighlight: "#ffcccc", // Light red for markdown highlighted text background
        },
        darkMode: {
          light: "#000000", // Black for page background
          lightgray: "#393939", // Dark gray for borders
          gray: "#646464", // Neutral gray for graph links and heavier borders
          darkgray: "#d4d4d4", // Light gray for body text
          dark: "#ffffff", // White for header text and icons
          secondary: "#e63946", // Vibrant red for link color and current graph node
          tertiary: "#a4161a", // Darker red for hover states and visited graph nodes
          highlight: "rgba(230, 57, 70, 0.15)", // Soft red for internal link background, highlighted text, and code lines
          textHighlight: "#e63946", // Vibrant red for markdown highlighted text background
        },        
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({enableCheckbox: true, enableInHtmlEmbed: true, mermaid: true}),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
