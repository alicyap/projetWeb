<?php
require_once 'linkdb.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST["nom"];
    $prenom = $_POST["prenom"];
    $email = $_POST["email"];
    $mdp = $_POST["mdp"];

    $stmt = $conn->prepare("INSERT INTO utilisateurs (nom, prenom, email, mdp) VALUES (:nom, :prenom, :email, :mdp)");
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':prenom', $prenom, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->bindValue(':mdp', $mdp, PDO::PARAM_STR);

    if ($stmt->execute()) {
        // Inscription réussie
        header("Location: connexion.php?inscription_reussie=1");
        exit(); 
    } else {
        echo "Erreur lors de l'inscription : " . $stmt->errorInfo()[2];
    }

    $stmt->closeCursor();
}


?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Inscription</title>
</head>
<body>
    <h2>Inscription</h2>
    <form method="post" action="inscription.php">
        <label for="nom">Nom:</label>
        <input type="text" name="nom" required>

        <label for="prenom">Prénom:</label>
        <input type="text" name="prenom" required>

        <label for="email">Email:</label>
        <input type="email" name="email" required>

        <label for="mdp">Mot de passe:</label>
        <input type="password" name="mdp" required>

        <input type="submit" value="S'inscrire">
    </form>
</body>
</html>
