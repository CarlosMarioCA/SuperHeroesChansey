package com.DesarrolloWeb.AvengersColombia.objetos.denuncia;

import com.DesarrolloWeb.AvengersColombia.objetos.notificacion.NotificacionAdministrador;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import jakarta.persistence.*;

@Entity
@Table(name = "denuncias_objeto")
@Inheritance(strategy = InheritanceType.JOINED)
public class DenunciaObjeto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "denunciante_id")
    private Cuenta perfilDenunciante;
    @ManyToOne
    @JoinColumn(name = "denunciado_id")
    private Cuenta perfilDenunciado;
    @Column
    private String titulo;
    @Column(length = 1000)
    private String descripcionDenuncia;
    @OneToOne(mappedBy = "denuncia", cascade = CascadeType.ALL, orphanRemoval = true)
    private NotificacionAdministrador notificacionAdministrador;

    public DenunciaObjeto(String titulo, String descripcionDenuncia, Cuenta perfilDenunciante, Cuenta perfilDenunciado) {
        this.titulo = titulo;
        this.perfilDenunciante = perfilDenunciante;
        this.perfilDenunciado = perfilDenunciado;
        this.descripcionDenuncia = descripcionDenuncia;
        this.notificacionAdministrador = new NotificacionAdministrador(titulo, descripcionDenuncia, this);
    }
    protected DenunciaObjeto() {
        // Constructor requerido por JPA
    }

    public Cuenta getPerfilDenunciante() {
        return perfilDenunciante;
    }

    public void setPerfilDenunciante(Cuenta perfilDenunciante) {
        this.perfilDenunciante = perfilDenunciante;
    }

    public Cuenta getPerfilDenunciado() {
        return perfilDenunciado;
    }

    public void setPerfilDenunciado(Cuenta perfilDenunciado) {
        this.perfilDenunciado = perfilDenunciado;
    }

    public String getDescripcionDenuncia() {
        return descripcionDenuncia;
    }

    public void setDescripcionDenuncia(String descripcionDenuncia) {
        this.descripcionDenuncia = descripcionDenuncia;
    }

    public NotificacionAdministrador getNotificacionAdministrador() {
        return notificacionAdministrador;
    }

    public void setNotificacionAdministrador(NotificacionAdministrador notificacionAdministrador) {
        this.notificacionAdministrador = notificacionAdministrador;
    }
}
