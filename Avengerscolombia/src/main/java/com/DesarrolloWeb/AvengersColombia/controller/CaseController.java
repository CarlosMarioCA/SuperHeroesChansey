package com.DesarrolloWeb.AvengersColombia.controller;

import com.DesarrolloWeb.AvengersColombia.objetos.aviso.Aviso;
import com.DesarrolloWeb.AvengersColombia.objetos.aviso.Importancia;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.SuperHeroe;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Usuario;
import com.DesarrolloWeb.AvengersColombia.repository.UsuarioRepository;
import com.DesarrolloWeb.AvengersColombia.repository.SuperHeroeRepository;
import com.DesarrolloWeb.AvengersColombia.service.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/casos")
@CrossOrigin(origins = "*")
public class CaseController {

    @Autowired
    private CaseService caseService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private SuperHeroeRepository superHeroeRepository;

    // Endpoint para que un usuario cree un caso (exclusivo para usuarios)
    @PostMapping("/crear")
    public ResponseEntity<Aviso> createCase(@RequestBody CasoRequest request) {
        Usuario creador = usuarioRepository.findById(request.getCreadorId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Aviso aviso = caseService.createCase(request.getTitulo(), request.getDescripcion(),
                request.getCategoria(), request.getImagenR(), request.getImportancia(), creador);
        return ResponseEntity.ok(aviso);
    }

    // Endpoint para que un superhéroe obtenga la lista de casos abiertos
    @GetMapping("/abiertos")
    public ResponseEntity<List<Aviso>> getOpenCases() {
        return ResponseEntity.ok(caseService.getOpenCases());
    }

    // Endpoint para que un superhéroe acepte un caso. Se espera el id del superhéroe en el body.
    @PostMapping("/{avisoId}/aceptar")
    public ResponseEntity<Map<String, Object>> acceptCase(@PathVariable int avisoId, @RequestBody AceptarRequest request) {
        SuperHeroe heroe = superHeroeRepository.findById(request.getHeroeId())
                .orElseThrow(() -> new RuntimeException("Superhéroe no encontrado"));
        Long chatId = caseService.acceptCase(avisoId, heroe);
        Map<String, Object> response = Map.of("chatId", chatId, "message", "Caso aceptado y chat creado");
        return ResponseEntity.ok(response);
    }

    public static class CasoRequest {
        private String titulo;
        private String descripcion;
        private String categoria;
        private String imagenR;
        private Importancia importancia;
        private int creadorId;

        // Getters y setters
        // ...
        public String getTitulo() { return titulo; }
        public void setTitulo(String titulo) { this.titulo = titulo; }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public String getCategoria() { return categoria; }
        public void setCategoria(String categoria) { this.categoria = categoria; }
        public String getImagenR() { return imagenR; }
        public void setImagenR(String imagenR) { this.imagenR = imagenR; }
        public Importancia getImportancia() { return importancia; }
        public void setImportancia(Importancia importancia) { this.importancia = importancia; }
        public int getCreadorId() { return creadorId; }
        public void setCreadorId(int creadorId) { this.creadorId = creadorId; }
    }

    public static class AceptarRequest {
        private int heroeId;
        public int getHeroeId() { return heroeId; }
        public void setHeroeId(int heroeId) { this.heroeId = heroeId; }
    }
}