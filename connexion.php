<?php
require_once 'linkdb.php';

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $mdp = $_POST["mdp"];

   
    $stmt = $conn->prepare("SELECT id, email, mdp FROM utilisateurs WHERE email = ? AND mdp = ?");
    $stmt->execute([$email, $mdp]);
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        $_SESSION["email"] = $result['email'];
        header("Location: site.html");
        exit();
    } else {
        $erreur = "Email ou mot de passe incorrect.";
        echo $erreur;
    }
}

$conn = null;  // Ferme la connexion PDO à la fin du script
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
</head>
<body>
    <h2>Connexion</h2>
    <?php if (isset($erreur)) { echo "<p>$erreur</p>"; } ?>
    <form method="post" action="connexion.php">
        <label for="email">Email:</label>
        <input type="text" name="email" required>

        <label for="mdp">Mot de passe:</label>
        <input type="password" name="mdp" required>

        <input type="submit" value="Se connecter">
    </form>
</body>
</html>
