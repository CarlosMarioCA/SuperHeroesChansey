package com.DesarrolloWeb.AvengersColombia.objetos.notificacion;

import com.DesarrolloWeb.AvengersColombia.objetos.denuncia.DenunciaObjeto;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Administrador;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import jakarta.persistence.*;

@Entity
@Table(name = "notificaciones_administrador")
public class NotificacionAdministrador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String titulo;
    @Column(length = 1000)
    private String descripcion;
    @OneToOne
    @JoinColumn(name = "denuncia_id")
    private DenunciaObjeto denuncia;

    protected NotificacionAdministrador() {
        // Constructor requerido por JPA
    }
    public NotificacionAdministrador(String titulo, String descripcion, DenunciaObjeto denuncia) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.denuncia = denuncia;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public DenunciaObjeto getDenuncia() {
        return denuncia;
    }

    public void setDenuncia(DenunciaObjeto denuncia) {
        this.denuncia = denuncia;
    }
}


