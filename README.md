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
Πιθανότατα δε θα χρειαστεί να πειράξετε τα αρχεία index.html και styles.css. Αρκεί μόνο στα elements που θα φτιάξετε στη συνέχεια να βάλετε τις αντίστοιχες classes τους όπως περιγράφουν και τα σχόλια στον κώδικα
3. Kάντε host το project στον IIS. Αν δε γνωρίζετε πώς θα δώσουμε οδηγίες στο workshop. Θα δείτε ένα input field και 2 κουμπιά, Cancel και Pay. Ξεκινήστε υλοποιώντας τη συνάρτηση getAllItems() η οποία καλεί το /s1services/list/item endpoint του API και φέρνει όλα της είδη της συγκεκριμένης βάσης.
4. Αφού φέρετε όλα τα είδη, για το καθένα από αυτά πρέπει να φτιάξετε ένα div με class "item" το οποίο θα δείχνει τον κωδικό και το όνομα του είδους. Με τα div αυτά θα γεμίσετε το element με id "browser".
5. To element με id "lines" είναι ένα table με 3 στήλες Όνομα - Τιμή είδους - ΦΠΑ Είδους. Κάθε φορά που κάνουμε κλικ σε ένα είδος από τον browser θέλουμε να βάζουμε ένα row στο table. Στο tr βάλτε class "line" και στα cells td βάλτε class "line-cell-alphabetic" ή "line-cell-numeric". Υπάρχει παράδειγμα σε σχόλια στο index.html
6. Kάθε φορά που βάζετε μία νεα γραμμή, ενημερώστε την Συνολική αξία του παραστατικού που δείχνει το input field. Προσθέστε δηλαδή την τιμή του είδους της νέας γραμμής
7. Όταν πατήσουμε Cancel τότε πρέπει να αδειάζει το table με τις γραμμές και να μηδενίζεται η Συνολική Αξία
8. Τέλος, πατώντας Pay καταχωρούμε το παραστατικό στο κεντρικό σύστημα μηχανογράφησης. Θα στείλετε ένα request στο /s1services/set/saldoc endpoint του API με body:
```Javascipt
{
        data: {
            SALDOC: [{
                PAYMENT: "100", // Μετρητοίς
                SERIES: "7071", // Απόδειξη Λιανικής Πώλησης
                TRDR: "54" // Πελάτης Λιανικής
            }],
            ITELINES: [{
                LINENUM: 1,
                MTRL: "1017",
                QTY1: 1,
            }......]
        },
        appId: APPID,
        token: TOKEN
}
```
Ο πίνακας ΙΤΕLINES του body έχει όλες τις γραμμές του παραστατικού. Οδηγίες κατά τη διάρκεια του workshop. H καταχώρηση του παραστατικού ίσως πάρει κάποια δευτερόλεπτα. Οπότε πατώντας το κουμπί Pay βάλτε innerHTML στο κουμπί ```'<i class="fa fa-spinner fa-spin"></i>Loading'``` ενώ όταν ολοκληρωθεί η καταχώρηση (πάρετε response sto request) επαναφέρετε το κουμπί στην αρχική κατάσταση

Για οποιαδήποτε απορία μη διστάζετε να μας ρωτάτε!

## Happy Coding 

  
