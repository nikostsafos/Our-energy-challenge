# Import libraries #### 
library(reshape) # melt
library(tidyr) # spread

# Set current directory 
setwd("~/Dropbox/- Code/- Github/Our energy challenge/data/codeData")

# Read file ####
dat = read.csv('../cleandata/CO2database.csv', header = T)

# Subset data for maps ####
df = dat[ dat$Year == 2014,]
df = df[ !df$Unit %in% c('1990=100','Peak=100'), ]
df = df[df$Variable %in% c('GDP',
                           'GDPCAPITA',
                           'TPES',
                           'ENERGYCAPITA',
                           'CO2',
                           'CO2CAPITA'),]
df$Variable <- gsub('TPES',"ENERGY", df$Variable)
df = df[,c(1,3,5)]

df$Vintage = ifelse(df$Peak.Year < 1990, 'Before 1990',
                    ifelse(df$Peak.Year <= 1999, 'From 1990 to 1999',
                           ifelse(df$Peak.Year <= 2007, 'From 2000 to 2007',
                                  ifelse(df$Peak.Year <= 2013,
                                         'From 2008 to 2013', 'Highest was 2014'))))

colnames(df)[3] = 'PeakYear'

countrycodes <- read.csv("../backup/countrycodesID.csv")
countrycodes$CountryID = formatC(countrycodes$CountryID, width = 3, flag = "0")
df <- merge(df, countrycodes, by.df = "Country", by.countrycodes = "Country"); rm(countrycodes)
df <- df[,c(1,5,6, 2,4)]
colnames(df)[3] = 'id'

df = spread(df, Variable, Vintage)
write.csv(df, '../cleandata/peaks.csv', row.names = F)

# CSV file with all data indexed to 1990 ####
df = dat[ dat$Unit == '1990=100',]
df = df[, c(1:3,7:8)]
df = df[df$Variable %in% c('CO2', 'TPES', 'GDP', 'CO2CAPITA', 'ENERGYCAPITA', 'GDPCAPITA'),]
df$Variable <- gsub('TPES',"ENERGY", df$Variable)
df = na.omit(df)
df = spread(df, Variable, Value)

write.csv(df, '../cleandata/data1990.csv', row.names = F)

# CSV file with all data for 2014 ####
df = dat[dat$Year == '2014',]
df = df [ !df$Unit %in% c('1990=100','Peak=100'),]
df = df [,c(1:3,7:8)]
df = spread(df, Variable, Value)
write.csv(df, '../cleandata/data2014.csv', row.names = FALSE)