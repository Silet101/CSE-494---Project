# Anime Analysis 
	Authors: Tyler Roten, Miguel Garcia-Peguero, Austin Frost
## Overview:
This project we were tasked with creating a unique analytics dashboard for a given dataset. The data set chosen was [Anime Recommendations Database](https://www.kaggle.com/datasets/CooperUnion/anime-recommendations-database?select=rating.csv) with the goal of exploring popularity trends in anime based on various metrics and find recommendations catered to any user based on their own exploration of the data. The dashboard consists of four graphs all rendered using the D3 javascript library on a web based platform using HTML to present the board and CSS to enhance it. The dashboard primarily focuses around genre exploration and the trends related to anime genres as it can often be a difficult landscape to navigate with so many options available to users. This tool will help guide users to find excellent quality animes catered to whatever taste the user would like and find unexpected trends with there existing favorites.

## Data Description:
The data contained in the [Anime Recommendations Database](https://www.kaggle.com/datasets/CooperUnion/anime-recommendations-database?select=rating.csv) is the user prefernce of 73,516 users on 12,296 anime. These are distributed across two tables. A third graph data set was derived from the original Anime Recomandations Database for a total of three datasets. 

The first dataset from the original database, called anime.csv, contains each the data on each anime including numerical values like rating, episodes, and members. It also contains the list of all related genres or each anime and a string with platform in which it aired on. All though there is additional attributes they will not be used for this project. Each row in this table represent a unique anime with 12296 anime total. Each column represent an attribute about the anime fora total of seven (cardanlity 7)

The second dataset from the original dataset was not used for the purposes of this project. It was simply bunlded in the [Anime Recommendations Database](https://www.kaggle.com/datasets/CooperUnion/anime-recommendations-database?select=rating.csv).

The third data set was derived using the data from anime.csv to create a graph of all related genres. Python was used to find the number of times pairs of genres apeared together in an anime and produced a csv containg the pair of animes and the number of times they are seen together. Each row representing two unigue animes that were seen together. The total scale of the data set had 603 rows each with three columns (cardinality 3)

## Goals:

## Idioms:

## Reflection:

## Workload: