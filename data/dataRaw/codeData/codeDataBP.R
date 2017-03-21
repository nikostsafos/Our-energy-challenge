library(xlsx) # read xlsx
library(dplyr) # filter
library(reshape) # melt
library(tidyr) # spread
library(rjson)

setwd("~/Dropbox/- Code/- Github/our energy challenge/data/dataRaw/codeData")

# Source data
# fileURL = "http://www.bp.com/content/dam/bp/excel/energy-economics/statistical-review-2016/bp-statistical-review-of-world-energy-2016-workbook.xlsx"
# download.file(fileURL, destfile="./bpstats2016.xlsx")

# Read data for energy consumption by fuel: oil, gas, coal, nuclear, hydro, renewables ####
oil = read.xlsx("../rawData/bpstats2016.xlsx", sheetName = "Oil Consumption – Tonnes", startRow = 3, endRow = 90, header = T) # read data
oil$Variable = "Oil"
oil = oil[,c(1, 56, 2:52)]
colnames(oil)[1] = "Million.tonnes.oil.equivalent"
gas = read.xlsx("../rawData/bpstats2016.xlsx", sheetName = "Gas Consumption – tonnes", startRow = 3, endRow = 90, header = T) # read data
gas$Variable = "Gas"
gas = gas[,c(1, 57, 2:52)]
coal = read.xlsx("../rawData/bpstats2016.xlsx", sheetName = "Coal Consumption -  Mtoe", startRow = 3, endRow = 90, header = T) # read data
coal$Variable = "Coal" 
coal = coal[,c(1, 56, 2:52)]
nuclear = read.xlsx("../rawData/bpstats2016.xlsx", sheetName = "Nuclear Consumption - Mtoe", startRow = 3, endRow = 90, header = T) # read data
nuclear$Variable = "Nuclear" 
nuclear = nuclear[,c(1, 56, 2:52)]
hydro = read.xlsx("../rawData/bpstats2016.xlsx", sheetName = " Hydro Consumption - Mtoe", startRow = 3, endRow = 90, header = T) # read data
hydro$Variable = "Hydro" 
hydro = hydro[,c(1, 55, 2:52)]
renewables = read.xlsx("../rawData/bpstats2016.xlsx", sheetName = "Other renewables - Mtoe", startRow = 3, endRow = 90, header = T) # read data
renewables$Variable = "Renewables" 
renewables = renewables[,c(1, 55, 2:52)]

# Combine all fuels into one df ####
dat = rbind(oil, gas, coal, nuclear, hydro, renewables)
rm(oil, gas, coal, nuclear, hydro, renewables)

# Eliminate NAs (countries without data; mostly pre-independence FSU countries)
dat = dat[!is.na(dat$Million.tonnes.oil.equivalent),]

# Basic clean-up
dat[ dat == "n/a" ] = NA # set .. equal to NA
dat = melt(dat, id.vars=c("Million.tonnes.oil.equivalent", "Variable")) ## create long df 
dat$variable = gsub("X","", dat$variable) # eliminate X from year column
colnames(dat) = c("Country", "Variable", "Year", "Value") # rename column

dat = transform(dat, Country = as.character(Country), 
                Variable = as.factor(Variable), 
                Year = as.numeric(Year), 
                Value = as.numeric(levels(Value)[Value]))

# Calculate energy consumption as percent of total 
dat = spread(dat, Variable, Value)

dat$Total = dat$Oil + dat$Coal + dat$Gas + dat$Nuclear + dat$Hydro + dat$Renewables
dat = mutate(dat, 
             OilPCT = (Oil/Total)*100,
             CoalPCT = (Coal/Total)*100,
             GasPCT = (Gas/Total)*100,
             NuclearPCT = (Nuclear/Total)*100,
             HydroPCT = (Hydro/Total)*100,
             RenewablesPCT = (Renewables/Total)*100,
             TotalPCT = (Total/Total)*100)
dat = na.omit(dat)
dat = dat[,c(1:2, 7, 10, 3, 11, 4, 12, 6, 13, 5, 14, 8, 15, 9, 16)]

countries = read.csv('../backup/countries.csv', header = T)
dat = merge(dat, countries,
      by.dat = 'Country',
      by.countries = 'Country')

dat = dat[,c(17, 2:16)]
colnames(dat)[1] = 'Country'

# Write CSV file 
write.csv(dat, '../../../data/bpstats.csv', row.names = F)

# dat$Country = gsub("China Hong Kong SAR","Hong Kong", dat$Country) # rename country
# dat$Country = gsub("United Arab Emirates","UAE", dat$Country) # rename country
# dat$Country = gsub("Russian Federation","Russia", dat$Country) # rename country
# dat$Country = gsub("Trinidad & Tobago","Trinidad", dat$Country) # rename country
# dat$Country = gsub("\\<US\\>","United States", dat$Country) # rename country
# dat$Country = gsub("Total ","", dat$Country) # rename country

# # Creat long CSV file 
# dat = melt(dat, id.vars = c('Country', 'Year'))
# colnames(dat)[3:4] = c('Variable', 'Value')
# write.csv(dat, '../../../data/bpstatsLong.csv', row.names = F)
# 
# df <- toJSON(unname(split(dat, 1:nrow(dat))))
# df = toJSON(unname(split(dat, 1:nrow(dat))))
# write(df, '../../../data/bpstatsLong.json')
# 
# 
# # Create two sepearate files ####
# regions = c("Total North America", "Other S. & Cent. America", "Total S. & Cent. America", "USSR",
#             "Other Europe & Eurasia", "Total Europe & Eurasia", "Other Middle East", "Total Middle East",
#             "Other Africa", "Total Africa", "Other Asia Pacific", "Total Asia Pacific", "Total World")
# 
# regions = c("North America", 
#             "S. & Cent. America", "Other S. & Cent. America", 
#             "Europe & Eurasia", "Other Europe & Eurasia", "USSR",
#             "Middle East", "Other Middle East", 
#             "Africa", "Other Africa", 
#             "Asia Pacific", "Other Asia Pacific", 
#             "World")
# 
# df = dat[ dat$Country %in% regions, ] # create df with regional totals
# write.csv(df, '../../../data/bpstatsRegions.csv', row.names = F)
# 
# df = dat[ !dat$Country %in% regions, ] # create df with countries only
# write.csv(df, '../../../data/bpstatsCountries.csv', row.names = F)
# 
# countries = as.data.frame(unique(df$Country))
# colnames(countries) = 'Country'
# countries$Country = paste0('<option value="', countries$Country, '">', countries$Country, '</option>')
# #<option value="Canada">Canada</option>
# 
# write.csv(countries, '../../../data/bpCountryList.csv', row.names = F)
# 
# # Find largest energy users (top )
# largestenergyconsumers = 10
# df = dat[dat$Year == 2015,]
# df = subset(df, select = c('Country', 'Total'))
# df = df[order(df[,2], decreasing = T),]
# df = df[1:largestenergyconsumers,]; rm(largestenergyconsumers)
# top = unique(df$Country)
# df = dat[dat$Country %in% top,]; rm(top)
# 
# write.csv(df, '../cleanData/bpstatstop30.csv', row.names = F)
# 
