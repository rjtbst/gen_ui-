const { tavily } = require("@tavily/core");

require('dotenv').config();
const apiKey = process.env.TAVILY_API_KEY;
const tvly = tavily({ apiKey });

async function main() {
  const response = await tvly.search("Who is Leo Messi?");
  console.log(response);
}

main();