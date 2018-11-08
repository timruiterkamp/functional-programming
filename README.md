# Front-end applications OBA

In this project I will research a case based on information i have extracted from the OBA Api. 
The chosen case can be found [here](#Chosen-research-case). The project overal was very fun to do and with the thought of challenging myself by not blocking the possibilities of just the OBA Api, I used Puppeteer to create my own scraper that scrapes prices of books.

The product van be found here: (https://functional-programming.netlify.com)[https://functional-programming.netlify.com]

## Table of contents

* [Installation of the project](#Installation-of-the-project)
* [Possible research cases](#Possible-research-cases)
* [Chosen research case](#Chosen-research-case)
    * [Subquestions](#subquestions)
* [Overview research case](#Overview-research-case)
    * [Results along the way](#Outcomes-along-the-way)
* [Proces](#Proces)
    * [Week 1](#Week-1)
    * [Week 2](#Week-2)
    * [Problems I ran into](#problems)
* [The scraper](#The-bol.com-scraper)
* [Techniques used](#Techniques-used)
* [Code description](#Code-description)




## Installation of the project

```bash
git clone https://github.com/timruiterkamp/functional-programming.git
cd functional-programming/api
npm install or npm i
nodemon index
```
This project uses `.env`. The right setup is:

```
PUBLIC_KEY=KEY
SECRET_KEY=KEY
```  
## Possible research cases

* Are there more books to be lend out during spring than during fall, and what are the leading genres in these periods of time.  
* Are the titles of childrenbooks under influence of populair babynames.   
* Is there a significant increase in the usage of vulgare language.  
* How many authors can be placed / matched with the letter of the alphabet.  
* How many books are there per language within th public library of Amsterdam.  
* Is there an increase in foreign languages with the upcoming tourists and foreign workers.  
* What is the total worth of books withing a genre withing the public library of Amsterdam.  
* How many books do you need to lend to get the value of your subscription back.  
* Is there an increase in female or male images on the covers of books over the last years.  

## Chosen research case
How many books do you need to lend to get the value of your subscription back.  

### subquestions
* What books are worth most
* How many books do you have to read to return the subscription value
* Is the a significant difference in value between genres
* How many times does a book to be lend out
* Is there a difference in value between languages
  
## Overview research case
To get the right results I had to analyze te API from the OBA (public library of Amsterdam) and choose the needed subjects through filtering.  

So the first steps I had to take was looping through the data and filter on the chosen subject: author,title, language and eventually publication data. After getting all the right information per subject I created a new dataset with just the right data.  

I used this new dataset to analyze the title for the scraper I build and then collecting the price per item and adding it to the right subject. This way I had a clean dataset with information about the book and belonging price. Next thing was just creating a new dataset with the subscription data which I could use to make the needed calculations.
  
After these steps to clean out the data en creating a new dataset, I started calculating total prices to see what books and how many books you would need to read to get your subscription value back.

Overview of the subscriptions:
```JSON
[
    {
        "name": "Oba Junior",
        "price": 0
    },
    {
        "name": "Oba Totaal",
        "price": 42,
        "young-adults": 22,
        "low-income": 5,
        "AdamNet-card": 55
    },
    {
        "name": "Oba basic",
        "price": 32,
        "elder": 22,
        "AdamNet-card": 45
    }
]
```
New dataset item with the cleaned data:
```JSON
[
    {
        "author": "Peter Benchley",
        "title": "Jaws",
        "language": "nederlands",
        "price": 6
    }
]
```

### Overview from all the results
!['All filtered results'](https://github.com/timruiterkamp/functional-programming/blob/master/json-overview.png)

## Sketch of the possible outcome
I am aiming for a visual representation of the amount of books that are needed to reach the costs of the subscription. The block for the books can be hovered to create an information layer about the book.

!['Idea of the possible outcome of my project'](https://github.com/timruiterkamp/functional-programming/blob/master/sketch-mockup-functional-program.jpg)

## Outcomes along the way
* I used the search term roman and filtered by 'avonturenroman' to get results with variation in price   and possibly a nice outcome where multiple books end up costing the equivalent of the OBA      subscription, instead of just one science book.
* There are 7 dutch translated Jaws books needed to get the subscription value back
* The english (second hand) version of Jaws is twice as expensive as the dutch translated version
* Unfortunately I couldn't track al the prices from bol.com


## Proces

### Yet TODO
- [x] Get price of a product
- [x] Sort on 'tweedehands' and 'Nederlandstalig'
- [x] Create new object with the right data
- [x] Create new object with prices
- [X] Refactor index to clean code
- [ ] Support multiple genres (Nice to have)
- [ ] Visualize prices
- [ ] Build: How many pages are the total of the books
- [ ] Build: Can you lend all books at once (10 books max)
- [ ] Gemiddelde prijs boeken

To give a good representation of the progress I've made I capture everyday and write about the progress I made, things I have done and problems I ran into.  
### Week 1

-   Monday
    -   Talks about the project  
    -   I have connected to the api and started basic analysing the assets of the api  
    -   I did set up a basic server and converted the xml to json to get a better overview  
    ***
-   Tuesday
    -   Started thinking about questions  
    -   Analysed multiple results I got and decided if I could use it for my possible research case.  
    -   Build basic function to get and filter results from the API  
    -   I ran into some difficulties filtering the right data and ended up in a way too long chain of      maps. Then I were introduced to jsonpath, it's a library that searches strings you pass into       it an returns the object.
    ***
-   Wednesday
    -   Refactored my code to seperate helper functions from my request functions 
    -   Supported a getAll function so more than 20 results would come in.
    -   Rethinked my questions and possibilities and ended up chosing an awesome project
    -   Set up the filter to match my criteria I needed
    ***
-   Thursday
    -   Fixed my filter function, it now gives object with matching results instead of seperate            results that could'nt be matched.
    -   Updated my readme and process while thinking of next steps I should dive into
    -   Started on the webscraper for amazon to get the prices
    -   Tried connecting to amazon and ebay API but got stuck in authentication errors
    -   After multiple tries I decided to create my own scraper with puppeteer and I got the prices!
    ***
-   Friday
    -   Finetuned the scraper to select only books and using the filters 'nederlandstaling' and            'tweedehans' on the bol.com website to get realistic results.
    -   Got an awesome talk about D3 and Observable where I got new insights in the possibilites of        the D3 library.
    -   I refactored a lot of my code into more functional setup
---

### Week 2

-   Monday
    -   Over the weekend I finished my scraper and support one or many searches
    -   I refactored a lot of code to make it more neat
    -   On monday I seperated my api from my get requests as this shouldn't intervere eachother
    -   Build in support for cases where no data is available and when there is data available
    -   I've got more information about user safety on the web through a talk from Bits of Freedom
    -   An presentation of D3 showed more in-depth knowledge about the working of certain elements in      the library and some showcases were shown to get us started
    -   I added my sketches to the readme and updated it with more relevant information
    -   Started with the D3 library in combination with my own filtered data
    ***

-   Tuesday
   
    ***
-   Wednesday
    
    ***
-   Thursday
    
    ***
-   Friday
   
  
## Problems I ran into  
Problems with filtering I ran into:   
To filter based on titles, authors and images I used the jsonpath package. The package works great but the downside was it deliverd seperate titles, authors and images that could not be matched with eachother. Because the behaviour of the package removes results it couldn't find. This results in a mismatch when i wanted to combine the results.
  
To tackle this problem I wrote a helper function that would use the objects and a string containing the search term. To keep the results matched I made a new object with the results found in a object containing all the terms.

To give a better perspective of this confusing story here is a layout of the object:  
before:  
```JSON
[
    {
    "id": [],
    "frabl": [],
    "detail-page": [],
    "coverimages": [],
    "titles": [],
    "authors": [],
    "formats": [],
    "identifiers": [],
    "publication": [],
    "classification": [],
    "languages": [],
    "subjects": [],
    "description": [],
    "summaries": [],
    "notes": [],
    "target-audiences": [],
    "librarian-info": [],
    "undup-info": []
    }
]
```

after:  
```JSON
[
    {
    "author": [],
    "title": [],
    "languages": []
    }
]
```
## The bol.com scraper
The bol.com scraper is a little scraper that returns the value of the first hit on bol.com in the book section of the page.

To use the scraper anywhere you can just do the following:
```javascript
const initScraper = require('./scraper/scraper')

// this beneath will scrape the website of bol.com for jaws books and returns the value of the first one
initScraper().then(scraper => {
    scraper.findPricesByItems('jaws')
}
// returns €6 for the dutch version
```

## Techniques used
* Puppeteer
* NodeJs
* Promises
* jsonpath
* Axios

## Code description
| Files   |      Description      |
|----------|-------------|
| index.html |  Base of the code where the visualisations take place|
| ./style/* |  Styling elements |
| ./scripts/* |  Script for the website, mainly for visualizations  |
| ./api/index.js |  Base of the code where the api magic happens |
| ./api/OBAapiHandler/obaApi |   Here is where the OBA api functions hold up   |
| ./api/cleanBookData |   This file contains the clean data with prices   |
| ./api/subscriptions |   The value of the different subscriptions   |
| ./api/helpers/filterHelpers |  Handle filter requests  |
| ./api/helpers/getHelpers | Handle get requests |
| ./api/helpers/objectHelper | Handle Object requests |
| ./api/scraper/scraper |    The bol.com scraper logic   |

## License
[MIT LICENSE](license.txt)