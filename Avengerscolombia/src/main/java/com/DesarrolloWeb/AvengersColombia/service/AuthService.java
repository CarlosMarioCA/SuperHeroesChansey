package com.DesarrolloWeb.AvengersColombia.service;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.SuperHeroe;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Usuario;
import com.DesarrolloWeb.AvengersColombia.repository.UsuarioRepository;
import com.DesarrolloWeb.AvengersColombia.repository.SuperHeroeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private SuperHeroeRepository superHeroeRepository;

    // Realiza la validación y distingue entre usuario y superhéroe
    public Cuenta login(String email, String password) {
        // Primero se busca en usuarios
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null && usuario.getPassword().equals(password)) {
            return usuario;
        }
        // Luego se busca en superhéroes
        SuperHeroe heroe = superHeroeRepository.findByEmail(email);
        if (heroe != null && heroe.getPassword().equals(password)) {
            return heroe;
        }
        return null;
    }
}
