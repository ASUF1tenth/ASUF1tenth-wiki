import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  
  // Define the parts of your title
  const titlePart1 = title.split(" ")[0] // "ASU"
  const titlePart2 = " " + title.split(" ")[1] // Note the leading space

  return (
    <h1 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        {/* Use spans with specific classes for styling */}
        <span class="title-asu">{titlePart1}</span>
        <span class="title-f1tenth">{titlePart2}</span>
      </a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
}

/* --- New CSS Rules --- */

/* 1. "ASU" part changes color based on the theme */
.title-asu {
  color: var(--dark); /* Uses the theme's text color (black in light mode, white in dark mode) */
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor