# Doc deploiement de mise à jour sur TestFlight

## 1 - app.json

- incrémenter la valeur de version :

```json
 "version": "1.0.2", # +1
```

- Incrémenter la valeur de buildNumber dans ios :

```json
    "ios": {
      "supportsTablet": true,
      "backgroundColor": "#ffffff",
      "bundleIdentifier": "com.trempoling69.rougyCashierApp",
      "buildNumber": "2" # +1
    },
```

## 2 - lancer le build avec eas

1. lancer dans le terminal :

```shell
eas build --platform ios
```

2. se connecter à son compte apple
3. répondre la question si on veut activer les notifications push
4. attendre le build

## 3 - Soumettre le build à Apple

1. lancer dans le terminal

```shell
eas submit -p ios --latest
```

2. attendre la soumission

## 4 - Soumettre l'application au testeur

1. Aller sur app store connect
2. Se connecter
3. Aller dans Apps
4. Cliquer sur l'app en question
5. Aller dans la section TestFlight
6. Cliquer sur Gérer à côté de info manquante
7. Répondre aucun à la question

## 5 - Iphone

1. Mettre à jour sur l'Iphone dans TestFlight
