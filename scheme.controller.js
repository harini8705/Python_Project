import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const url = "https://www.tn.gov.in/scheme/department_wise/2";

export const scrapeSchemes = async () => {
    try {
        console.log(`[INFO] Scraping started at ${new Date().toLocaleString()}`);
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const schemes = [];

        $('.scheme_lst p a').each((index, element) => {
            const name = $(element).text().trim();
            const link = $(element).attr('href');
            schemes.push({
                name,
                link: `${link}`
            });
        });

        // Save data to a JSON file
        const outputPath = '../client/public/schemes.json'; // Adjust path if necessary
        fs.writeFileSync(outputPath, JSON.stringify(schemes, null, 2));
        console.log(`[INFO] Scraping completed. Data saved to ${outputPath}`);
    } catch (error) {
        console.error(`[ERROR] Failed to scrape data:`, error.message);
    }
};
