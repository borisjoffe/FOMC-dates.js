// ==UserScript==
// @name         FOMC Meeting Dates
// @namespace    https://borisjoffe.com
// @version      1.0.0
// @description  Output FOMC meeting dates (second day of meeting) after the year 2020
// @author       Boris Joffe
// @match        https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm
// @icon         https://www.google.com/s2/favicons?sz=64&domain=federalreserve.gov
// @grant        none
// @license      MIT
// ==/UserScript==

/*
The MIT License (MIT)

Copyright (c) 2024 Boris Joffe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/* jshint -W097, -W041 */
/* eslint-disable no-console, no-unused-vars */
(function() {
    'use strict';

// const $ = jQuery // included in page

const NUM_MEETINGS = 8

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

function getFomcDates() {
	const latestYear = $('.panel-heading')[0].innerText.match(/\d{4}/)[0]
	console.debug({ latestYear })

	// only go up to year 2020 due to many cancelled meetings that year
	const EARLIEST_YEAR = 2020
	const MAX_MEETINGS = (latestYear - EARLIEST_YEAR) * NUM_MEETINGS

	const padLeftZero = (num) => num < 10 ? '0' + num : '' + num

	const fomcMonths = Array.from(document.querySelectorAll('.fomc-meeting__month'))
		.map(month => {
			const mo = (month.innerText.split('/')[1] ?? month.innerText.split('/')[0]).substr(0, 3).toLowerCase()
			const idx = MONTHS.indexOf(mo) + 1
			return padLeftZero(idx)
		})
		.slice(0, MAX_MEETINGS)

	const fomcDates = Array.from(document.querySelectorAll('.fomc-meeting__date'))
		.map((d, idx) => {
			const dateTxt = d.innerText.split('-')[1] ?? d.innerText
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

function outputFomcDates() {
	const fomcDates = getFomcDates()

	console.log(fomcDates) // array of tuples with note (or empty string) in 2nd element of tuple
	console.log(fomcDates.map(x => x[0]).join('\n')) // plain text output in order listed on page
	console.log(fomcDates.map(x => x[0]).toSorted()/*.toReversed()*/.join('\n')) // plain text output in chronological order (earliest to latest

	document.getElementById('lastUpdate').innerHTML +=
		'<div>'
		+ fomcDates.map(x => x[0]).toSorted().join('<br>')
		+ '</div>'
}


window.addEventListener('load', outputFomcDates, true)

})();