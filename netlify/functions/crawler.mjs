import axios from "axios";
import * as cheerio from "cheerio";

export const handler = async (event, context) => {
  const url = "https://invoice.etax.nat.gov.tw/";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const prizeNumbers = [];

    // 開獎數字
    $(".etw-tbiggest").each((index, element) => {
      const number = $(element).text().trim();
      prizeNumbers.push(number);
    });

    // 只保留前五筆 [特別獎, 特獎, 頭獎三個]
    const topFivePrizes = prizeNumbers.slice(0, 5);

    // 抓取期別資訊
    const periodText = $(".etw-on").first().text().trim();
    const periodMatch = periodText.match(/^(\d+)年(\d{2}-\d{2}月)/);
    const year = periodMatch[1];
    const month = periodMatch[2];

    return {
      statusCode: 200,
      body: JSON.stringify({ prizes: topFivePrizes, year, month }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "爬蟲發生錯誤: " + error.message }),
    };
  }
};
