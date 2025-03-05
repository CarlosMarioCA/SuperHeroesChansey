package com.DesarrolloWeb.AvengersColombia.controller;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import com.DesarrolloWeb.AvengersColombia.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Cuenta cuenta = authService.login(request.getEmail(), request.getPassword());
        if (cuenta == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Credenciales inválidas");
            return ResponseEntity.status(401).body(error);
        }

        // Determinar rol: "usuario" o "superheroe"
        String role = (cuenta instanceof com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Usuario) ? "usuario" : "superheroe";

        Map<String, Object> response = new HashMap<>();
        response.put("id", cuenta.getId());
        response.put("nombre", cuenta.getNombre());
        response.put("email", cuenta.getEmail());
        response.put("rol", role);
        response.put("imagenPerfil", cuenta.getImagenPerfil());

        return ResponseEntity.ok(response);
    }

    public static class LoginRequest {
        private String email;
        private String password;

        // Getters y setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
