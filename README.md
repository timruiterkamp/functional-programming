# Front-end applications OBA

In this project I will research a case based on information i have extracted from the OBA api.  
## Table of contents (Not yet working)

* [Setup of the project](#Base)
* [Possible research cases](#possible)
* [Chosen research case](#chosen)
* [proces](#proces)
* [Problems I ran into](#problems)



## Base setup of the project

```bash
git clone https://github.com/timruiterkamp/functional-programming.git
cd functional-programming
npm install
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

## Chosen research case:
How many books do you need to lend to get the value of your subscription back.  

### subquestions:
* What books are worth most
* How many books do you have to read to return the subscription value
* Is the a significant difference in value between genres
* How many times does a book to be lend out
* Is there a difference in value between languages
  

## Outcomes along the way:
* I used the search term roman and filtered by 'avonturenroman' to get results with variation in price   and possibly a nice outcome where multiple books end up costing the equivalent of the OBA      subscription, instead of just one science book.
* There are 7 dutch translated Jaws books needed to get the subscription value back
* The english (second hand) version of Jaws is twice as expensive as the dutch translated version


## Proces

### Yet TODO
- [x] Get price of a product
- [ ] Sort on 'tweedehands' and 'Nederlandstalig'
- [x] Create new object with the right data
- [ ] Create new object with prices
- [ ] Refactor index to clean code
- [ ] Support multiple genres

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
---

### Week 2

-   Monday

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
const bolScraper = require('./scraper/scraper')
const scrape = new bolScraper().findPriceByItem

// this beneath will scrape the website of bol.com for jaws books and returns the value of the first one
scrape('jaws')
// returns 16.99 for the english version
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
| index.js |  Base of the code where the magic happens |
| ./api |   Here is where the OBA api functions hold up   |
| ./helpers/filterHelpers |  Handle filter requests  |
| ./helpers/getHelpers | Handle get requests |
| ./scraper |    The bol.com scraper logic   |
