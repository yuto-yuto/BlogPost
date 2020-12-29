# Shopping app

## Requirements 1

* console application
* commands
  * `command`: list the available commands
  * `list`: show the item list and prices
  * `add`: add the item to shopping cart. Format is `add <item name> <number>`, e.g. `add apple 2`. If specified item name doesn't exist it shows an error message.
  * `remove`: remove the item from the shopping cart. Format is `remove <item name> <number>`, e.g. `remove apple 2`. If the number specified number is bigger than the number in shopping cart, the item is completely removed. If the specified item name doesn't exist in the shopping cart it shows an error message.
  * `cart`: list item names and number of each item and number of total items in shopping cart and show total prices
  * `pay`: pay the cost and receive change. Format is `pay <money>`, e.g. `pay 1100` which means you pay 1100. If the ones place digit is not 0, it shows an error message. Cart should be empty after the payment.
* virtual coins are used for the payment
* coin type
  * 10
  * 50
  * 100
  * 500
  * 1000
* items
  * apple: 110
  * water: 90
  * coffee: 150

## Requirements 2 (spec update)

* commands
  * `pay`: If there are not enough coins in the shop for the change, it shows an error message.
* 5 coins for each in the shop

e.g.
If a customer buy 1 apple (110) and pay 10000 a customer cannot buy it.

1000: 5 -> 5000
500: 5 -> 2500
100: 5 -> 500
50: 5 -> 250
10: 5 -> 50
total -> 8300

Shop must give 9890 but it cannot give it.
