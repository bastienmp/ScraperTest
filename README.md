# ScraperTest
 Scaper test for MadBox

Utilisation
```
$> npm install
$> npm start
```

Le temps que vous avez passé sur ce projet.
1h.

Vos choix techniques / architecturaux.
- Pour ne pas a avoir a parser le HTML, j'ai utilisé cheerio ce qui me permet d'avoir un résultat sûr, même si l'architecture du site change un peu, en revanche un tel module est peut être exagéré compte-tenu de la difficulté de la tâche.

Ce que vous feriez si vous deviez pousser ce projet un cran plus loin.
- Un système d'alerte en cas d'échec du parsing (mail par exemple), dans le cas où le site ou la façon de nommer les fichier change.
