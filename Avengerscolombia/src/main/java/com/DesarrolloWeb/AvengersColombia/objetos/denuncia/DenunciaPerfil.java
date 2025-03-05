package com.DesarrolloWeb.AvengersColombia.objetos.denuncia;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import jakarta.persistence.*;

@Entity
@Table(name = "denuncias_perfil")
public class DenunciaPerfil extends DenunciaObjeto{
    protected DenunciaPerfil() {
        // Constructor requerido por JPA
    }
    public DenunciaPerfil(String titulo, String descripcionDenuncia, Cuenta perfilDenunciante, Cuenta perfilDenunciado) {
        super(titulo, descripcionDenuncia, perfilDenunciante, perfilDenunciado);
    }
}
