const embedReadable = async (
  articleTitle,
  previewURL,
  siteName,
  articleURL,
) => {
  let frontmatter;
  let body;

  // Check if the URL is a direct link to a PDF file
  if (articleURL.toLowerCase().includes("pdf")) {
    if (!(articleURL.toLowerCase().endsWith(".pdf")))
      articleURL = `${articleURL}.pdf`
    frontmatter = `---
tags:
- resources/articles
status:
- not_consumed
- no_moc
- no_friend
- no_action
annotation-target: ${articleURL}.pdf
annotation-target-type: pdf
---`;
    body = `<iframe src="https://docs.google.com/gview?url=${articleURL}&embedded=true" style="width:100%; aspect-ratio:1" frameborder="0" allow-popups-to-escape-sandbox></iframe>`;
  }
  // Check if the URL is a Google Drive file link
  else if (articleURL.includes("drive.google.com") && articleURL.includes("/file/d/")) {
    frontmatter = `---
tags:
- resources/articles
status:
- not_consumed
- no_moc
- no_friend
- no_action
annotation-target: https://drive.google.com/uc?export=download&id=${
      articleURL.split("/file/d/")[1].split("/")[0]
    }
annotation-target-type: pdf
---`;
    body = `| [Open Original](${articleURL}) |
| ------------------------------------------ |
<iframe src="https://drive.google.com/file/d/${articleURL.split("/file/d/")[1].split("/")[0]}/preview" style="width:100%; aspect-ratio:1" frameborder="0" allow-popups-to-escape-sandbox></iframe>`;
  }
    // Check if the URL is a Kosmik link
  else if (articleURL.includes("play.kosmik.app")) {
    frontmatter =`---
tags:
- resources/kosmiks
status:
- not_consumed
- no_moc
- no_friend
- no_action
---`;
      ;
    body = `| [Open Original](${articleURL}) | [Open in App](file://C:/Users/Mohammed%20Hany/AppData/Roaming/Microsoft/Windows/Start%20Menu/Programs/Kosmik.lnk) |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
<iframe src="${articleURL}" style="width:100%; aspect-ratio:0.7"></iframe>`
  }
    
  // Check if the URL is a Google Drive folder
  else if (articleURL.includes("drive.google.com") && articleURL.includes("/folders/")) {
    frontmatter = `---
tags:
- resources/folders
status:
- not_consumed
- no_moc
- no_friend
- no_action
---`;
    body = `\`\`\`embed
title: "${articleTitle}"
image: "https://zeevector.com/wp-content/uploads/Google-Drive-Logo-Transparent.png"
description: "Google Drive Folder"
url: "${articleURL}"
\`\`\``;
  }

  // Else default to web article
  else {
    frontmatter = `---
tags:
- resources/articles
status:
- not_consumed
- no_moc
- no_friend
- no_action
---`;
    body = `\`\`\`embed
title: "${articleTitle}"
image: "${previewURL || "https://blog.tubikstudio.com/wp-content/uploads/2020/05/lumen-museum-website-design.jpg"}"
description: "${siteName || "Web Article"}"
url: "${articleURL}"
\`\`\``;
  }

    return `${frontmatter}\n\n${body}\n`;
};

module.exports = embedReadable;
