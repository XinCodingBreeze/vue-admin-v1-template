const fs = require('fs')
const path = require('path')

let puppeteer
try {
  puppeteer = require('puppeteer')
} catch (e) {
  console.error('Puppeteer not installed. Run: npm install puppeteer --save-dev')
  process.exit(1)
}

const screenshotsDir = path.join(__dirname, '..', 'doc', 'screenshots')
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true })
}

const pages = [
  { url: 'http://localhost:5173/login', name: 'login.png', desc: '登录页' },
  { url: 'http://localhost:5173/demo', name: 'demo.png', desc: '示例页' },
  { url: 'http://localhost:5173/ai-helper', name: 'ai-helper.png', desc: 'AI 助手' },
  { url: 'http://localhost:5173/file-identification', name: 'file-identification.png', desc: '文件识别' },
  { url: 'http://localhost:5173/table', name: 'table.png', desc: '表格页面' },
]

;(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 },
  })

  for (const item of pages) {
    try {
      const page = await browser.newPage()
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 15000 })
      await new Promise(r => setTimeout(r, 2000))
      const filePath = path.join(screenshotsDir, item.name)
      await page.screenshot({ path: filePath })
      console.log(`OK: ${item.desc} -> ${item.name}`)
      await page.close()
    } catch (err) {
      console.error(`FAIL: ${item.desc} - ${err.message}`)
    }
  }

  await browser.close()
  console.log('Done. Screenshots saved to doc/screenshots/')
})()
