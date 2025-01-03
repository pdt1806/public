import fs from "fs";
import path from "path";
import showdown from "showdown";

const converter = new showdown.Converter();

export const mdToHtml = async (__dirname: string, file: string) => {
  const filename = path.basename(file);

  const inputText = fs.readFileSync(file, { encoding: "utf8" });
  const generatedHtml = converter.makeHtml(inputText);

  const htmlContent = fs.readFileSync(path.join(__dirname, "utils", "html", "markdown.html"), "utf8");

  return htmlContent.replace("{{FILE_NAME}}", filename).replace("{{GENERATED_HTML}}", generatedHtml);
};
