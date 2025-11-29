import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { Options } from "./quartz/components/Explorer"


export const sortFn: Options["sortFn"] = (a, b) => {
  // Define your custom folder order here
  const customOrder = ["System", "Perception", "Planning", "Control"]
  // 1. Determine if the nodes are folders
  // In Quartz, a node is a folder if the 'file' property is null (or undefined)
  const aIsFolder = a.isFolder
  const bIsFolder = b.isFolder

  // 2. Sort Folders before Files
  if (aIsFolder && !bIsFolder) {
    return -1
  }
  if (!aIsFolder && bIsFolder) {
    return 1
  }

  // 3. If both are folders, apply the Custom Order
  if (aIsFolder && bIsFolder) {
    const aIndex = customOrder.indexOf(a.displayName)
    const bIndex = customOrder.indexOf(b.displayName)

    // If both are in the custom list, sort by their position in that list
    if (aIndex !== -1 && bIndex !== -1) {
      return bIndex > aIndex ? -1 : 1
    }

    // If only 'a' is in the custom list, it comes first
    if (aIndex !== -1) {
      return -1
    }

    // If only 'b' is in the custom list, it comes first
    if (bIndex !== -1) {
      return 1
    }
  }

  // 4. Default Sorting (Alphabetical)
  // Used for files, or folders that aren't in your custom list
  return a.displayName.localeCompare(b.displayName, undefined, {
    numeric: true,
    sensitivity: "base",
  })
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/ASUF1tenth",
      "GitHub Discussions": "https://github.com/ASUF1tenth/ASUF1tenth-wiki/discussions",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "Navigation",
      filterFn: (node) => node.displayName !== "Meta",
      sortFn,
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "Navigation",
      filterFn: (node) => node.displayName !== "Meta",
      sortFn,
    }),
  ],
  right: [],
}
