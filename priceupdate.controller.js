import puppeteer from "puppeteer";

export const priceUpdates = async (req, res) => {
    const { priceType, commodity, state } = req.body;
    console.log(req.body)
    try {
        // Launch Puppeteer
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Navigate to the website
        await page.goto('https://agmarknet.gov.in/', { waitUntil: 'networkidle2', timeout: 60000 });

        // Select Price/Arrival type
        await page.waitForSelector('#ddlArrivalPrice');
        await page.type('#ddlArrivalPrice', priceType); // 0 = Price, 1 = Arrival, 2 = Both

        // Select Commodity
        await page.waitForSelector('#ddlCommodity');
        await page.type('#ddlCommodity', commodity);

        // Select State
        await page.waitForSelector('#ddlState');
        await page.type('#ddlState', state, );

        // Select District
        await page.waitForSelector('#ddlDistrict');
        await page.type('#ddlDistrict', district, { delay: 100 });

        
        // Click Submit
        await page.waitForSelector('#btnGo');
        const button = await page.$('#btnGo');
        await button.evaluate(btn => btn.disabled === false); // Ensure the button is enabled
        await button.click();

        // Wait for the results table
        await page.waitForSelector('#cphBody_GridPriceData');

        // Scrape Table Data
        const tableData = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('#cphBody_GridPriceData tbody tr'));
            return rows.map(row => {
                const columns = Array.from(row.querySelectorAll('td'));
                return columns.map(col => col.innerText.trim());
            });
        });

        // Close browser
        await browser.close();

        // Send scraped data as response
        res.json({ success: true, data: tableData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to scrape data' });
    }
};

export const tempPriceUpdates = async (req, res) => {
    const browser = await puppeteer.launch({
        headless: false, // Run in headful mode for debugging
        //slowMo: 50, // Slow down actions for observation
        timeout:0, // Disable timeout
    });
    const page = await browser.newPage();
    page.setDefaultTimeout(300000)
    try {
        await page.goto('https://agmarknet.gov.in/', { waitUntil: 'networkidle2' });

        // Fill in the form
        await page.type('#ddlArrivalPrice', '0');
        await page.type('#ddlCommodity', 'Banana'); // Replace with your commodity value
        await page.type('#ddlState', 'Tamil Nadu'); // Replace with your state code
        await page.type('#ddlDistrict', 'Salem'); // Replace with your district code
        

        // Scroll to the submit button
        await page.waitForSelector('#btnGo', { visible: true });
        await page.evaluate(() => {
            document.querySelector('#btnGo').scrollIntoView();
        });

        // Retry click
        let retries = 3;
        while (retries > 0) {
            try {
                await page.click('#btnGo');
                break; // Success
            } catch (error) {
                retries--;
                if (retries === 0) throw error;
                await page.waitForTimeout(1000); // Wait and retry
            }
        }

        // Wait for the table to load
        await page.waitForSelector('#cphBody_GridPriceData', { timeout: 300000 });

        // Extract data
        const tableData = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('#cphBody_GridPriceData tbody tr'));
            return rows.map(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                return cells.map(cell => cell.textContent.trim());
            });
        });

        // console.log('Extracted Table Data:', tableData);

        await browser.close();
        res.status(200).json({
            success: true,
            data: tableData,
        });
    } catch (error) {
        console.error('Error:', error.message);
        await browser.close();
    }
}