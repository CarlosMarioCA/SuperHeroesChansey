package com.DesarrolloWeb.AvengersColombia.objetos.denuncia;

import com.DesarrolloWeb.AvengersColombia.objetos.aviso.Aviso;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import jakarta.persistence.*;

@Entity
@Table(name = "denuncias_avisos")
public class DenunciaAviso extends DenunciaObjeto {
    @ManyToOne
    @JoinColumn(name = "aviso_id")
    private Aviso avisoR;

    public DenunciaAviso(String titulo, String descripcionDenuncia, Cuenta perfilDenunciante, Cuenta perfilDenunciado, Aviso avisoR) {
        super(titulo, descripcionDenuncia, perfilDenunciante, perfilDenunciado);
        this.avisoR = avisoR;
    }

    public DenunciaAviso() {

    }

    public Aviso getAvisoR() {
        return avisoR;
    }

    public void setAvisoR(Aviso avisoR) {
        this.avisoR = avisoR;
    }
}
