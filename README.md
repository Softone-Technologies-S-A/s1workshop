# SoftOne Workshop

## Εισαγωγή

Κατά τη διάρκεια αυτού του workshop θα υλοποιήσουμε μία απλή ταμειακή μηχανή ακολουθώντας τα παρακάτω βήματα:

1. Θα χρειαστείτε το API της Soft1. Ανοίχτε το documentation [Soft1 API](http://s1sites.s1cloud.net/s1docs/goapi/docs/index.html#overview). Μπορείτε να το δοκιμάσετε στέλνοντας requests με το εργαλείο Postman. Credentials:
  * API SERVER : https://go.s1cloud.net
  * s1code Header : 10502479681120
  * token = 9J8pIbTHLLLI9JT4TLLoHKLIL4rtLrHvHLXQKNHJLK4
  * appId = 703
Όταν εκτελέσετε request client-side θα πάρετε μήνυμα σφάλματος από τον browser για CORS Policy (ο Postman είναι server side και δεν έχει πρόβλημα). Για να το αποφύγουμε αυτό ανοίχτε το [CORS proxy](https://cors-anywhere.herokuapp.com) και πατήστε "Request temporary access to the demo server". Έπειτα σε κάθε request που εκτελείτε από τον κώδικα θα βάζετε μπροστά στο url "https://cors-anywhere.herokuapp.com"
>https://cors-anywhere.herokuapp.com/https://go.s1cloud.net/s1services/list/item
2. To project περιέχει ήδη 4 αρχεία: 
  * index.html 
  * styles.css 
  * controller.js
  * DS-DIGI.ttf
Πιθανότατα δε θα χρειαστεί να πειράξετε τα αρχεία index.html και styles.css. Αρκεί μόνο στα elements που θα φτιάξετε στη συνέχεια να βάλετε τις αντίστοιχες classes τους όπως περιγράφουν και τα σχόλια στον κώδικα. Ξεκινήστε υλοποιώντας τη συνάρτηση getAllItems() η οποία καλεί το /s1services/list/item endpoint του API και φέρνει όλα της είδη της συγκεκριμένης βάσης
  
