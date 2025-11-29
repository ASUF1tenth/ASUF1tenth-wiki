const embedLocal = async (tp) => {
    const name = await tp.system.prompt("Enter name")

    await tp.file.rename(name);
    
    let frontmatter = `---
tags:
  - resources/articles
status:
  - no_action
  - no_friend
  - no_moc
  - not_consumed
annotation-target: ${name}.pdf
---
`
    let body = `![[${name}.pdf]]`

    return `${frontmatter}\n\n${body}`
}

module.exports = embedLocal