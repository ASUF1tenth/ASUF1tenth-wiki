const apiKey = "pk_0c552201a81e5e41f4acc4c283d00b80202857f7";

const getUrlMetadata = async (url) => {
  const apiUrl = `https://jsonlink.io/api/extract?url=${url}&api_key=${apiKey}`;

  // Make a GET request using the Fetch API
    let data = await fetch(apiUrl)
    return data.json();
};

const rename = async (articleURL, tp) => {
  let name;
  if (articleURL.match(".pdf"))
    await tp.file.rename(articleURL.split("/").pop().split(".pdf")[0]);
  if (
    articleURL.includes("drive.google.com") &&
    articleURL.includes("/file/d/")
  ) {
    name = await getUrlMetadata(articleURL);
      await tp.file.rename(name.title);
  }
  if (articleURL.includes("play.kosmik.app"))
  {
    name = await tp.system.prompt("Enter Kosmik name")
    await tp.file.rename(name)
    }
  return ``
};

module.exports = rename;
