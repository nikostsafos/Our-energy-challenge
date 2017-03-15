Our energy challenge: Revisiting assumptions about climate change

Web version: https://nikostsafos.github.io/our-energy-challenge/

# What's in this repository?

Code to render the finished website.
- css: css styling for the main page (style.css) and the appendix (appendix.css).
- data: clean CSV files with data for web rendering. For data processing, see rawData folder. 
- img: open graph image for link sharing. 
- js: various D3.js scripts to render the graphics on the main page. 

dataRaw (mainly R)
- backup: Files to link variable codes with variable names. 
- rawData: Data as downloaded from the web. 
1. CO2Highlights.xls: http://www.iea.org/publications/freepublications/publication/CO2-emissions-from-fuel-combustion-highlights-2016.html
- codeData: Data to transform raw data into clean CSV files for graphs.
1. codeDataClean: R file to transform CO2Highlights.xls into simpler CSV file (data by country)
2. codeDataCleanWorld: R file to transform CO2Highlights.xls into simpler CSV file (data for world totals)
3. codeDataSubset: R file to create various subsets of the data for easier rendering.
- cleanData: Data that will be used for website. 
1. co2database: Most of the data from original source, but reformatted and with various calculations performed. 
2. data1990.csv: All data (GDP, energy use, CO2 emissions, total and per capita) indexed to 1990).
3. data2014.csv: All data (GDP, energy use, CO2 emissions, total and per capita) for the year 2014. 
4. eaks.csv: Each country by year of peak for GDP, energy use and CO2 emissions. 
