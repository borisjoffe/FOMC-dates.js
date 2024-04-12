Federal Reserve FOMC Meeting Dates
==================================

<!--
### Install from [GreasyFork](https://greasyfork.org/en/scripts/TODO-INSERT)
-->

**NOTE: This script was created by a private individual and is NOT endorsed by or affiliated with the US Federal Reserve in any way**

Get the dates without the script
-----------------------------

Skip the install and get the dates in text or CSV format below (last updated 2024-04-11):

- [dates.txt](./dates.txt) - FOMC ISO dates for the second day of the two-day meeting
- [dates.csv](./dates.csv) - same as above but in CSV format. An asterisk in the second column signifies a meeting associated with a Summary of Economic Projections.

Userscript Features
-------------------

- Go to the Federal Reserve [FOMC Calendar](https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm)
- To view all of the FOMC meeting dates after 2020, scroll down to the bottom of the page
  where it says "Last Update".
  - For more technical users, you can open Developer Tools (press the "F12" key, then go to the "Console" tab) and use the output array as you wish
- The dates listed are in ISO date format (YYYY-MM-DD), and they are the 2nd date of the two-day meeting, since that is when the Fed usually holds a press conference
- You can put the FOMC dates in a spreadsheet or in a calendar program like
  [remind](https://dianne.skoll.ca/wiki/Remind_FAQ) to
  track Federal Reserve interest rate decisions

Userscript Requires
-------------------

One of the following:

- [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) with [Brave](https://brave.com/) or [Chrome](https://www.google.com/chrome/browser/)
- [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) with [Firefox](https://www.mozilla.org/firefox)
- [ViolentMonkey](https://addons.opera.com/en/extensions/details/violent-monkey/) / [TamperMonkey](https://addons.opera.com/en/extensions/details/tampermonkey-beta/?display=en) with [Opera](http://www.opera.com/) - untested

Run Locally
-----------

- Run `bun install` followed by `bun csv` to generate a CSV with all the ISO
  meeting dates locally
- Run `cut -f1 -d, dates.csv` to get just the ISO dates without the 2nd CSV column

<!-- [View on Github](https://github.com/borisjoffe/fomc-dates.js) -->

Other
-----

The Federal Reserve is an unconstitutional government program that uses "quantitative easing" to steal from the poor and give to the rich. [End the Fed](http://endthefed.org/)

License
-------

MIT
