const embedHighlight = (url) => {
    let body;
  
    // Check if the URL is a direct link to a PDF file
    if (url.match(".pdf")) {
      body = `<iframe src="http://docs.google.com/gview?url=${url}&embedded=true" style="width:100%; aspect-ratio:1" frameborder="0" allow-popups-to-escape-sandbox></iframe>`;
    }

    else {
        body = `<iframe src="${url}" style="width:100%; aspect-ratio:0.7" frameborder="0"></iframe>`;
    }

    return `\n${body}`
}

module.exports = embedHighlight