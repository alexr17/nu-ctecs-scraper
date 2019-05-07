# Northwestern CTECs scraper

The purpose of this repo is to scrape Northwestern's CTECs with puppeteer.

## Getting Started

You will need Node v10 and npm.

### Installing
```
git clone https://github.com/alexr17/nu-ctecs-scraper
cd nu-ctecs-scraper
npm install
mkdir pup-data
```

### Running
You will need to create a `.env` file with the variables `caesar_username` and `caesar_password`. In addition you will want to make sure that `headless` is set to `false` in `index.js` so that you can set up two factor authentication the first time.

