# Réponses — Exercices React-Admin

---

## Exercice 6 — ReferenceField & Relations

**6.1 — Quel appel HTTP génère ReferenceField pour résoudre le manager ?**

`ReferenceField` émet un appel `GET /Employees/{id}` pour chaque enregistrement affiché dans la liste. On peut l'observer dans l'onglet Network du navigateur : une requête par ligne est déclenchée pour résoudre la relation.

**6.2 — Que se passe-t-il visuellement si managerId ne correspond à aucun employé ?**

`ReferenceField` affiche une cellule vide de façon silencieuse, sans message d'erreur ni crash de l'application. Le composant gère l'absence de données de manière gracieuse.

---

## Exercice 7 — Création & Validation conditionnelle

**7.1 — Quelle méthode HTTP est émise lors de la soumission de InterneCreate ?**

Une requête `POST /Internes` est émise avec le corps JSON contenant les données du formulaire.

**7.2 — Quel hook est utilisé pour la validation conditionnelle de la rémunération, et pourquoi ?**

On utilise `useWatch` de `react-hook-form`. Il observe en temps réel la valeur du champ `paid` dans le formulaire. Quand `paid` est `false`, le composant `SalaryInput` est masqué et sa validation désactivée. `useWatch` est nécessaire car il permet de réagir aux changements de valeur d'un champ sans déclencher un re-rendu complet du formulaire.

---

## Exercice 8 — useGetOne & ManagerCard

**8.1 — Différence entre useGetOne et ReferenceField. Quand préférer l'un ou l'autre ?**

| | `ReferenceField` | `useGetOne` |
|---|---|---|
| Type | Composant déclaratif | Hook impératif |
| Rendu | Automatique par react-admin | Entièrement manuel |
| Contrôle | Limité | Total (isPending, error, data) |
| Usage | Affichage simple dans List/Show | Logique custom, mise en page complexe |

On préfère `useGetOne` quand on a besoin de contrôler les trois états (`isPending`, `error`, `data`) pour afficher un rendu spécifique, comme dans `ManagerCard`. On préfère `ReferenceField` pour un affichage simple sans logique particulière.

**8.2 — Que se passe-t-il si useGetOne reçoit id: undefined sans l'option enabled ?**

Sans `enabled`, react-admin émet immédiatement un appel `GET /Employees/undefined`, ce qui retourne une erreur 404 et fait passer le composant en état d'erreur. L'option `enabled: !!record?.mentorId` bloque l'appel tant que l'identifiant n'est pas disponible, évitant ainsi la requête invalide.

```ts
useGetOne(
  "Employees",
  { id: record?.mentorId },
  { enabled: !!record?.mentorId } // bloque l'appel si mentorId est undefined
);
```

---

## Exercice 9 — useGetList & DepartmentStats

**9.1 — Différence entre useGetList et ReferenceManyField. Dans quel cas useGetList est-il indispensable ?**

| | `useGetList` | `ReferenceManyField` |
|---|---|---|
| Type | Hook impératif | Composant déclaratif |
| Usage | Partout dans l'application | Uniquement dans Show/Edit |
| Accès au total | Oui, via `total` | Non directement |
| Logique custom | Possible | Non |

`useGetList` est indispensable quand on a besoin d'accéder au `total` sans afficher les données (comme dans `DepartmentStats` ou `Dashboard`), ou quand on se trouve en dehors d'un contexte de rendu react-admin.

**9.2 — Comment optimiser la requête de DepartmentStats pour ne récupérer que le total ?**

On fixe `perPage: 1` dans la pagination. json-server retourne le header `X-Total-Count` même avec un seul enregistrement chargé. React-admin lit ce header pour exposer la propriété `total`, ce qui évite de transférer inutilement tous les enregistrements.

```ts
const { total } = useGetList("Employees", {
  pagination: { page: 1, perPage: 1 }, // charge 1 seul enregistrement
  filter: { department: employee?.department, isActive: true },
});
```

---

## Exercice 10 — useUpdate & QuickStatusToggle

**10.1 — Quelle méthode HTTP useUpdate utilise-t-il par défaut ? Comment forcer PATCH ?**

`useUpdate` utilise `PUT` par défaut, ce qui remplace l'enregistrement entier. Pour forcer `PATCH`, il faut configurer le dataProvider avec un `httpClient` qui utilise la méthode PATCH, ou passer `{ mutationMode: "pessimistic" }` selon la version de react-admin et du dataProvider utilisé.

Avec `ra-data-json-server`, la méthode utilisée est `PUT`. Il faut donc toujours envoyer **tout l'enregistrement** dans `data` pour éviter de perdre des champs :

```ts
update("Employees", {
  id: record.id,
  data: { ...record, isActive: !record.isActive }, // spread obligatoire avec PUT
  previousData: record,
});
```

**10.2 — Pourquoi previousData est-il nécessaire ? Que se passe-t-il si on l'omet ?**

`previousData` est nécessaire pour le mécanisme de **mise à jour optimiste** de react-admin. Quand l'appel est émis, react-admin met à jour le cache local immédiatement sans attendre la réponse du serveur. Si l'appel échoue, il utilise `previousData` pour **restaurer l'état précédent**. Sans lui, en cas d'erreur, l'interface reste dans l'état modifié et devient incohérente avec la base de données.

---

## Exercice 11 — useCreate & Modale

**11.1 — Différence entre useCreate dans un composant custom et le composant `<Create>` de React-Admin.**

| | `useCreate` | `<Create>` |
|---|---|---|
| Type | Hook impératif | Composant page entière |
| Navigation | Reste sur la page courante | Redirige après succès |
| Formulaire | Géré manuellement (état React) | Géré automatiquement par react-admin |
| Usage | Modales, boutons inline, création contextuelle | Pages CRUD standard |

On utilise `useCreate` quand on veut créer une ressource **sans quitter la page**, comme dans une modale ou un formulaire inline.

**11.2 — Comment gérer le rechargement de la liste après une création réussie via useCreate ?**

On utilise le hook `useRefresh` fourni par react-admin. Il force le rechargement de la liste courante en invalidant le cache React Query.

```ts
const refresh = useRefresh();

create("Internes", { data: { ... } }, {
  onSuccess: () => {
    refresh();   // recharge la liste
    setOpen(false); // ferme la modale
  },
});
```

---

## Exercice 12 — Dashboard & Optimisation

**12.1 — Les 4 appels useGetList se font-ils en parallèle ou en séquence ?**

Ils se font **en parallèle**. React rend le composant `Dashboard` en une seule passe, ce qui déclenche les 4 hooks simultanément. React Query envoie les 4 requêtes HTTP en même temps sans attendre les réponses les unes après les autres.

**12.2 — Pourquoi perPage: 1 est préférable à perPage: 100 pour le Dashboard ?**

Le Dashboard n'a besoin que du **nombre total** d'enregistrements, pas des données elles-mêmes. Avec `perPage: 1`, json-server retourne un seul enregistrement mais inclut quand même le header `X-Total-Count` avec le compte exact. React-admin lit ce header pour exposer `total`. C'est donc jusqu'à 100 fois moins de données transférées pour un résultat identique.