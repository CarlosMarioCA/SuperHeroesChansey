package com.DesarrolloWeb.AvengersColombia.service;

import com.DesarrolloWeb.AvengersColombia.objetos.aviso.Aviso;
import com.DesarrolloWeb.AvengersColombia.objetos.aviso.Importancia;
import com.DesarrolloWeb.AvengersColombia.objetos.aviso.PanelAvisos;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.SuperHeroe;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Usuario;
import com.DesarrolloWeb.AvengersColombia.repository.PanelAvisosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CaseService {

    @Autowired
    private PanelAvisosRepository panelAvisosRepository;

    @Autowired
    private ChatService chatService;  // Inyectamos el ChatService

    // Permite a un usuario crear un "caso" (aviso)
    @Transactional
    public Aviso createCase(String titulo, String descripcion, String categoria, String imagenR, Importancia importancia, Usuario creador) {
        PanelAvisos panel = panelAvisosRepository.findAll().stream()
                .findFirst()
                .orElseGet(() -> panelAvisosRepository.save(new PanelAvisos()));
        Aviso aviso = new Aviso(titulo, descripcion, categoria, imagenR, importancia, panel);
        aviso.setCreador(creador); // Asigna el creador
        panel.getAvisos().add(aviso);
        panelAvisosRepository.save(panel);
        return aviso;
    }

    public List<Aviso> getOpenCases() {
        PanelAvisos panel = panelAvisosRepository.findAll().stream()
                .findFirst()
                .orElse(new PanelAvisos());
        return panel.getAvisos().stream()
                .filter(aviso -> aviso.isDisponible() && aviso.getCreador() != null)
                .collect(Collectors.toList());
    }

    // Permite que un superhéroe acepte un caso.
    // También marca el aviso como no disponible y crea un chat
    @Transactional
    public Long acceptCase(int avisoId, SuperHeroe heroe) {
        Aviso aviso = panelAvisosRepository.findAll().stream()
                .flatMap(panel -> panel.getAvisos().stream())
                .filter(a -> a.getId() == avisoId)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Caso no encontrado"));
        if (!aviso.isDisponible()) {
            throw new RuntimeException("Caso ya fue tomado");
        }
        if (aviso.getCreador() == null) {
            throw new RuntimeException("El aviso no tiene creador asignado");
        }
        aviso.setDisponible(false);
        panelAvisosRepository.save(aviso.getPanelAvisos());
        // Se crea un chat entre el usuario (creador) y el superhéroe.
        Integer creadorId = aviso.getCreador().getId();
        Integer heroeId = heroe.getId();
        // Se invoca ChatService para crear el chat y se retorna el id del chat creado.
        return chatService.createChat(List.of(creadorId, heroeId)).getId();
    }
}