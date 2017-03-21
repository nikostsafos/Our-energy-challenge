library(reshape) ## melt
library(tidyr) # spread
# library(ggplot2) # ggplot2
# library(scales) # labels = comma
# library(grid) ## grid.text

# library(dplyr) # mutate_each

setwd("~/Dropbox/- Code/- Github/our energy challenge/data/dataRaw/codeData")

dat <- read.csv('../rawData/table245.csv', 
                header = T, stringsAsFactors = F, skip = 4, nrows=113, na.strings = '---') # colClasses = c('character', 'character', rep(88, 'numeric'))) # read data

vars = c('1', '36', '58', '59')

dat = dat[dat$Line %in% vars,]
rm(vars)

dat$Line = gsub('1', 'PCE', dat$Line)
dat$Line = gsub('36', 'Gasoline', dat$Line)
dat$Line = gsub('58', 'Electricity', dat$Line)
dat$Line = gsub('59', 'Gas', dat$Line)

# Take out variable names
dat = dat[,c(1, 3:ncol(dat))]

# Calculate spending as % of total 
dat = melt(dat, id.vars = 'Line')
colnames(dat) = c('Variable', 'Year', 'Value')
dat = spread(dat, Variable, Value)
dat$Gasoline = (dat$Gasoline/dat$PCE) * 100
dat$Gas = (dat$Gas / dat$PCE) * 100
dat$Electricity = (dat$Electricity / dat$PCE) * 100
dat$Total = dat$Electricity + dat$Gas + dat$Gasoline

dat$Year = gsub('X', '', dat$Year)
dat$Year = as.numeric(dat$Year)
dat$Date = as.Date(paste(dat$Year, '01', '01', sep = '-'), format = '%Y-%m-%d')

dat = subset(dat, select = c('Year',
                             'Date',
                             'Gasoline',
                             'Electricity',
                             'Gas',
                             'Total'))

write.csv(dat, '../../../data/pce.csv', row.names = F)


font <- "Source Sans Pro" ## set font for graph
fsize <- 7 ## set font size for graph
footer <- 40.5 ## font 7 = 43; font 8 = 37.5

png(file = "../figures/Personal Consumption Expenditures by Major Type, 1929-2016.png",  width = 16, height = 9, units = "in", res = 600)
p <- ggplot(dat, aes(Year, Value)) +
        geom_line(size = 0.5) +
        labs(y = "Percent of total expenditures", x = "") + 
        scale_y_continuous(breaks = c(0,5,10,15,20,25, 30), labels = comma) + 
        scale_x_date(breaks = c(as.Date("1930-01-01"), 
                                as.Date("1960-01-01"), 
                                as.Date("1990-01-01"),
                                as.Date("2016-01-01")), date_labels = "%y") +
        ggtitle("Personal Consumption Expenditures by Major Type, 1929-2016") + 
        theme_bw() + 
        theme(panel.grid.minor = element_blank(),
              panel.grid.major.x = element_blank(),
              panel.grid.major.y = element_line(color='#E1E1E1', linetype = 'dashed', size = .1),
              strip.background = element_blank(),
              # panel.border = element_blank(),
              panel.border = element_rect(color='#bdbdbd'),
              panel.spacing.y=unit(-.05, "cm"),
              legend.position = "top",
              legend.margin = margin(-3, 0, -7),
              legend.background = element_blank(),
              legend.key.height = unit(.5, 'line'), 
              legend.text = element_text(size = fsize, family=font),
              legend.title = element_blank(),
              axis.ticks = element_blank(),
              plot.title = element_text(size = fsize+1, family = font, face = 'bold', hjust = 0.5),
              strip.text.x = element_text(size = fsize, family = font),
              axis.text.x = element_text(size = fsize, family = font),
              axis.text.y = element_text(size = fsize, family = font),
              axis.title.x = element_text(size = fsize, family = font),
              axis.title.y = element_text(size = fsize, family = font)) 
p + facet_wrap(~ Variable, ncol=4, scales = "fixed")
grid.text("Source: Bureau of Economic Analysis",
          vjust=footer, gp = gpar(fontfamily=font, fontsize = fsize))
dev.off()

