# Functional programming - High school of Amsterdam

In this project I will research a case based on information i have extracted from the OBA Api. 
The chosen case can be found [here](#Chosen-research-case). The project overal was very fun to do and with the thought of challenging myself by not blocking the possibilities of just the OBA Api, I used Puppeteer to create my own scraper that scrapes prices of books.

The product van be found here: [https://functional-programming.netlify.com](https://functional-programming.netlify.com)

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
## Possible research cases 🕵️

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

### Overview from all the results 🕵️‍♂️
!['All filtered results'](https://github.com/timruiterkamp/functional-programming/blob/master/json-overview.png)

## Sketch of the possible outcome ✏️
I am aiming for a visual representation of the amount of books that are needed to reach the costs of the subscription. The block for the books can be hovered to create an information layer about the book.

When hovering the book it will be clear what book you need to get with the right author. 

!['Idea of the possible outcome of my project'](https://github.com/timruiterkamp/functional-programming/blob/master/sketch-mockup-functional-program.jpg)

## Outcomes along the way 🚀
* I used the search term roman and filtered by 'avonturenroman' to get results with variation in price   and possibly a nice outcome where multiple books end up costing the equivalent of the OBA      subscription, instead of just one science book.
* There are 7 dutch translated Jaws books needed to get the subscription value back
* The english (second hand) version of Jaws is twice as expensive as the dutch translated version
* Unfortunately I couldn't track al the prices from bol.com due to some titles couldn't be found
* It is very important to really think good about data structures before you pass them along, I took way to long on trying to rebuilding the data structures again in D3.
* In the future I need to start sketching data structures and ask myself what items I really need, I took a couple hours every developing session where I had to rebuild certain pieces of the data.
* Total amount of books with price: 76 books
* Total value of the books: €834
* Amount of books below €12: 58 books
* Amount of books between €12 and €20: 12 books
* Amount of books above €20: 6 books

## Endresult 📊
After a very long battle with D3 and trying to get my data structure to work I finally came a step closer to what I was aiming for. D3 is a very powerful library which can be used in many cases but it is quite a struggle to get started due to the many features that are available. 
  
Something that I ran into a couple of times was that a lot of examples are all made in deprecated versions of D3, which creates a level of extra research that needs to be done to rebuild the example and grab pieces that could become useful. I found it quite frustrating in the beginning that all the examples are with perfect data structures, which made me feel my data was kind of crappy. I had to do a lot of restructuring, rebuilding and redefining my data before I could use my data in the example.
  
I tried D3 directly from my code without using Observable, Observable is cool but in my opinion it takes less skill to build and results in a little understanding of D3 instead of a lot of knowledge.
  
I'm actually a bit sad that I didn't could come up with more data and realising my goal. It works a bit but if I had a couple days more I could finish my visualization and really make it calculate the total price divided by the price in the categories.  
  
I used many D3 functions like `D3.nest`, `D3.stack`, calculation functions like `D3.mean, D3.sum`.
I still struggle with understanding how exactly the points of the chart are drawn but certainly thursday night and friday morning I got a better understanding of how it worked.

!['Visualization'](https://github.com/timruiterkamp/functional-programming/blob/master/functional-programming-outcome.png)


### Yet TODO
- [x] Get price of a product
- [x] Sort on 'tweedehands' and 'Nederlandstalig'
- [x] Create new object with the right data
- [x] Create new object with prices
- [X] Refactor index to clean code
- [ ] Support multiple genres (Nice to have)
- [X] Visualize prices
- [ ] Build: How many pages are the total of the books
- [ ] Build: Can you lend all books at once (10 books max)
- [X] Gemiddelde prijs boeken (This can be done with d3.mean)

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

## Conclusion

Things I really learned during the last two weeks are most based on better understanding and thinking of creating data structures, write better functions (This can be found in the /api/index.js folder, the main index.js still needs to be cleaned up), working with D3 and setting up a webscraper.

I never worked with D3 before but the library really got my interest. If I set aside my lack of knowledge I think I would make some more products with the library to see what it is capable of.

I also had little experience with the puppeteer scraper and this was very fun to create and to see what it is capable of, despite I even haven't tried it's full potential yet. I will create some more projects with Puppeteer.

To get back on my research case: How many books do you need to lend to get the value of your subscription back. If you would lend the 'De Weduve' from Saskia van der Lingen and read it, you would have most subscription values back. If you want to reach the highest subscription value you could add 'Heilige Oorlog' from Frank van der Knoop which is valued at €12. Combine these books and you would have a read books with a total value of €55, which is the same amount as the OBA totaal plus the AdamNet-card.  

## Techniques used
* Puppeteer
* NodeJs
* Promises
* jsonpath
* Axios
* D3

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