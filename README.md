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
#### Configuration

You will need to rename the `._env` file to `.env` with the variables `caesar_username` and `caesar_password` filled in. In addition you will want to make sure that `headless` is set to `false` in `index.js` so that you can set up two factor authentication the first time.

### Running

```
npm run
```