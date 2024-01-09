import test, { expect } from '../fixtures/basePages';


test.describe('Console log errors', () => {
    
    test('Page has no errors or logs', async ({ page }) => {
        
        const logs = [] as any;
        page.on("console", (message) => {
            return logs.push({ message, type: message.type() })
        })

        await page.goto('https://demoqa.com');
        console.log(logs);
        

        const errors = [] as any;
        page.on('pageerror', (error) => {
            return logs.push({ error, errorType: error.name })
        })

        expect.soft(logs.length).toBe(11);
        expect.soft(errors.length).toBe(0);
    
        
    })
})