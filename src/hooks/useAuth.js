import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const perfilRef = doc(db, "usuarios", firebaseUser.uid);
          const perfilSnap = await getDoc(perfilRef);

          if (perfilSnap.exists()) {
            const perfilData = perfilSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              nome: perfilData.nome || firebaseUser.displayName,
              tipoUsuario: perfilData.tipoUsuario || "colaborador", // padrão
            });
          } else {
            // Se não houver perfil, assume dados mínimos
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              nome: firebaseUser.displayName || "Usuário",
              tipoUsuario: "colaborador",
            });
          }
        } catch (error) {
          console.error("Erro ao buscar perfil do usuário:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}