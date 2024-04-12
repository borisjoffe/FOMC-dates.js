/* import * as cheerio from 'cheerio' */
const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

async function getHtml() {
	const FOMC_DATES_URL = 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm'
	const res = await fetch(FOMC_DATES_URL)
	const html = await res.text()
	return html
}

const html = await getHtml()
/* const $ = cheerio.load(html) */
const dom = new JSDOM(html)
const document = dom.window.document

// FOMC MUST meet 4 times/year by law. They've been meeting 8 times/year since 1981
const NUM_MEETINGS = 8

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

function getFomcDates(): Array<Array<string, string>> {
	/* const latestYear = $('.panel-heading')[0].textContent.match(/\d{4}/)[0] */
	/* const latestYear = $('.panel-heading').text().match(/\d{4}/)[0] */
	const latestYear = Array.from(document.querySelectorAll('.panel-heading')).map(x => parseInt(x.textContent, 10)).filter(yr => isFinite(yr)).toSorted().toReversed()[0]
	/* const latestYear = document.querySelector('h3').textContent.slice(-5, -1) */
	console.debug({ latestYear })

	// only go up to year 2020 due to many cancelled meetings that year
	const EARLIEST_YEAR = 2020
	const MAX_MEETINGS = (latestYear - EARLIEST_YEAR) * NUM_MEETINGS

	const padLeftZero = (num): string => num < 10 ? '0' + num : '' + num

	/* const fomcMonths = $('.fomc-meeting__month') */
	const fomcMonths = Array.from(document.querySelectorAll('.fomc-meeting__month'))
		.map(month => {
			const mo = (month.textContent.split('/')[1] ?? month.textContent.split('/')[0]).substr(0, 3).toLowerCase()
			/* const mo = (month.split('/')[1] ?? month.split('/')[0]).substr(0, 3).toLowerCase() */
			const idx = MONTHS.indexOf(mo) + 1
			return padLeftZero(idx)
		})
		.slice(0, MAX_MEETINGS)

	/* const fomcDates = Array.from($('.fomc-meeting__date')) */
	const fomcDates = Array.from(document.querySelectorAll('.fomc-meeting__date'))
		.map((d, idx) => {
			const dateTxt = d.textContent.split('-')[1] ?? d.textContent
			const dateNum = parseInt(dateTxt, 10)
			if (dateNum > 31)
				console.error('date is more than 31')
			const extraTxt = dateTxt.replace(/^\d{1,2}/, '')

			const yr = latestYear - Math.floor(idx / NUM_MEETINGS)
			return [[yr, fomcMonths[idx], padLeftZero(dateNum)].join('-'), (extraTxt ?? '')]
		})
		.slice(0, MAX_MEETINGS)

	if (fomcMonths.length !== fomcDates.length)
		console.error('FOMC months lengths doesnt match dates length')

	return fomcDates
}


/* console.log(html) */
/* console.log(getFomcDates()) */
const csv = getFomcDates().toSorted().join('\n')
fs.writeFileSync('dates.csv', csv)
console.log(csv)

/* console.log(getFomcDates().join('\n').join(',')) */
