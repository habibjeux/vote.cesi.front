export default function Unauthorized() {
  return (
    <div className="flex flex-col justify-center items-center min-h-full max-h-full">
      <h1>Accès non autorisé</h1>
      <p>Désolé, vous n'avez pas l'autorisation d'accéder à cette page.</p>
      <a href="/">Retourner à l'acceuil</a>
    </div>
  );
}
